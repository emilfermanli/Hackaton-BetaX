package main

import (
	"bufio"
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"log"
	"net"
	"net/http"
	"os/exec"
	"strings"
	"sync"
	"time"
)

var (
	upGrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

type conn struct {
	net.Conn

	SessionId   string
	CarId       string
	DeviceOwner string

	IdleTimeout   time.Duration
	MaxReadBuffer int64

	Version        int32
	VersionChecked bool
	VersionAttempt int

	Logged        bool
	LoginAttempt  int
	FunctionStart time.Time

	LongAnswer    bool
	GPSTrackingIs bool
}

type Server struct {
	Addr         int
	IdleTimeout  time.Duration
	MaxReadBytes int64

	listener   net.Listener
	inShutdown bool

	// currently connected sensors
	ConnectedDevices map[string]*conn

	// currently connected users
	ConnectedUsers map[string]*websocket.Conn

	repo *sql.DB
	//handler        *handler.UserHandler

	//databaseInsert string
	//gpsTrackerData map[string][]models.GpsTracker
	//heartbeatData  map[string][]models.HeartBeat
	Mu sync.Mutex

	debugMode bool
}

// (repo *repo.UserRepository)
func NewTcpServers(db *sql.DB) *Server {
	return &Server{

		repo:             db,
		ConnectedDevices: make(map[string]*conn, 1),
		ConnectedUsers:   make(map[string]*websocket.Conn, 1),

		debugMode: false,
		//IdleTimeout:      resetTime,
		MaxReadBytes: 1024,
	}
}

func main() {
	log.SetFlags(log.Lshortfile)

	// Open up our database connection.
	// I've set up a database on my local machine using phpmyadmin.
	// The database is called testDb
	db, err := sql.Open("mysql", "root:Deli8723$!@tcp(127.0.0.1:3306)/HackatroneData")

	// if there is an error opening the connection, handle it
	if err != nil {
		log.Println("Cant connect to Mysql")
		panic(err.Error())
	}

	// defer the close till after the main function has finished
	// executing
	defer func() {
		err := db.Close()
		if err != nil {
			log.Println(err.Error())
		}
	}()

	r := mux.NewRouter()

	srv := NewTcpServers(db)
	go srv.tcpServer(8080)

	r.HandleFunc("/wb", srv.WbEcho).Methods("GET")
	r.HandleFunc("/frontend", Frontend).Methods("GET")
	r.HandleFunc("/data", srv.FetchLastData).Methods("GET")
	r.HandleFunc("/data100", srv.FetchLastHundredData).Methods("GET")
	r.HandleFunc("/data/{from}/{to}", srv.FetchBetweenData).Methods("GET")
	r.HandleFunc("/api", Api).Methods("GET")
	r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("/root/aquahackatrone/assets/build"))))

	log.Fatal(http.ListenAndServe(":80", r))
}

type Ws struct {
	Message string
}

type Response struct {
	Error   bool        `json:"error"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (srv *Server) WbEcho(w http.ResponseWriter, r *http.Request) {

	if _, ok := srv.ConnectedUsers[r.RemoteAddr]; ok {
		delete(srv.ConnectedUsers, r.RemoteAddr)
	}

	wsConn, err := upGrader.Upgrade(w, r, nil)
	if err != nil {

		return
	}

	srv.ConnectedUsers[r.RemoteAddr] = wsConn

	// not to leave null connection
	defer func() {

		//TODO
		if _, ok := srv.ConnectedUsers[r.RemoteAddr]; ok {
			delete(srv.ConnectedUsers, r.RemoteAddr)
		}

		//srv.deleteUserConnection(token.UserId)
		err := wsConn.Close()
		if err != nil {
			return
		}
	}()

	for {
		log.Println("ready for receive websocket", wsConn.RemoteAddr())
		var vs Ws

		_, s, err := wsConn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}

		err = json.Unmarshal([]byte(s), &vs)
		if err != nil {
			log.Println(err.Error())
			break
		}

		fmt.Printf("%+v\n", vs)

		if err := wsConn.WriteJSON(vs); err != nil {
			err := wsConn.Close()
			if err != nil {
				return
			}
			return
		}
	}

	log.Println("exit while why?")
	return
}

func (srv *Server) tcpServer(addr int) {

	listener, err := net.Listen("tcp", fmt.Sprintf("%s%d", "0.0.0.0:", addr)) //PORT
	if err != nil {
		log.Println("net.listen ", err.Error())
		return
	}

	log.Println("starting server at port", 8080)
	defer func() {
		err := listener.Close()
		if err != nil {
			log.Println(err.Error())
		}
	}()

	// Запускаем цикл
	for {

		newConn, err := listener.Accept()
		if err != nil {
			log.Printf("error accepting connection %v", err)
			return
		}

		go srv.handleConnection(newConn)

	}
}

func Frontend(w http.ResponseWriter, r *http.Request) {

	log.Println("Frontend Api triggered from", r.RemoteAddr)
	//command:= exec.Command("/root/work/frontend.sh")
	command, err := exec.Command("/bin/bash", "-c", "/root/aquahackatrone/frontend.sh").CombinedOutput()
	// set var to get the output
	if err != nil {
		log.Println(err, err.Error())
	}

	log.Println(string(command))
	log.Println("Github frontend committed")
	JSON(w, 201, Response{Error: false, Message: "updated", Data: nil})

	return
}

type Tag struct {
	ID int `json:"id"`
}

func (srv *Server) FetchLastData(w http.ResponseWriter, r *http.Request) {

	results, err := srv.repo.Query("SELECT * FROM Data ORDER BY id DESC LIMIT 1")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var FetchData []Data
	for results.Next() {
		var data Data
		// for each row, scan the result into our tag composite object
		err = results.Scan(&data.id, &data.Date, &data.ClientId, &data.OwnerId, &data.WaterLevel, &data.WaterTemperature, &data.FlowRate, &data.WaterAcidity, &data.SalinityOfWater, &data.AirTemperature, &data.Sodium, &data.Alkaline, &data.No3, &data.Sulfate, &data.WaterPermeability, &data.WaterOxygen, &data.Blurring, &data.Chlorophyll, &data.Fikosin, &data.Ammonia, &data.SuspendedSolids, &data.NitrogenDioxide, &data.AmmoniumIon, &data.HardnessOfTheWater, &data.ChemicalOxygenDemand, &data.BiochemicalOxygenDemand, &data.Nitrite, &data.Nitrate)
		if err != nil {
			log.Println(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		FetchData = append(FetchData, data)
	}

	JSON(w, 201, Response{Error: false, Message: "", Data: FetchData})

	err = results.Close()
	if err != nil {
		log.Println(err.Error())
	}
	return
}

func (srv *Server) FetchLastHundredData(w http.ResponseWriter, r *http.Request) {

	results, err := srv.repo.Query("SELECT * FROM Data ORDER BY id DESC LIMIT 100")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var FetchData []Data
	for results.Next() {
		var data Data
		// for each row, scan the result into our tag composite object
		err = results.Scan(&data.id, &data.Date, &data.ClientId, &data.OwnerId, &data.WaterLevel, &data.WaterTemperature, &data.FlowRate, &data.WaterAcidity, &data.SalinityOfWater, &data.AirTemperature, &data.Sodium, &data.Alkaline, &data.No3, &data.Sulfate, &data.WaterPermeability, &data.WaterOxygen, &data.Blurring, &data.Chlorophyll, &data.Fikosin, &data.Ammonia, &data.SuspendedSolids, &data.NitrogenDioxide, &data.AmmoniumIon, &data.HardnessOfTheWater, &data.ChemicalOxygenDemand, &data.BiochemicalOxygenDemand, &data.Nitrite, &data.Nitrate)
		if err != nil {
			log.Println(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		FetchData = append(FetchData, data)
	}

	JSON(w, 201, Response{Error: false, Message: "", Data: FetchData})

	err = results.Close()
	if err != nil {
		log.Println(err.Error())
	}
	return
}

func (srv *Server) FetchBetweenData(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	results, err := srv.repo.Query("SELECT * FROM Data Where date >= ? AND date <= ? ORDER BY id DESC", vars["from"], vars["to"])
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var FetchData []Data
	for results.Next() {
		var data Data
		// for each row, scan the result into our tag composite object
		err = results.Scan(&data.id, &data.Date, &data.ClientId, &data.OwnerId, &data.WaterLevel, &data.WaterTemperature, &data.FlowRate, &data.WaterAcidity, &data.SalinityOfWater, &data.AirTemperature, &data.Sodium, &data.Alkaline, &data.No3, &data.Sulfate, &data.WaterPermeability, &data.WaterOxygen, &data.Blurring, &data.Chlorophyll, &data.Fikosin, &data.Ammonia, &data.SuspendedSolids, &data.NitrogenDioxide, &data.AmmoniumIon, &data.HardnessOfTheWater, &data.ChemicalOxygenDemand, &data.BiochemicalOxygenDemand, &data.Nitrite, &data.Nitrate)
		if err != nil {
			log.Println(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		FetchData = append(FetchData, data)
	}

	JSON(w, 201, Response{Error: false, Message: "", Data: FetchData})

	err = results.Close()
	if err != nil {
		log.Println(err.Error())
	}
	return
}

func JSON(w http.ResponseWriter, code int, r Response) {

	w.Header().Set("Content-Type", "application/json")
	data, err := json.Marshal(r)

	if err != nil {
		w.WriteHeader(500)
		errResponse := &Response{
			Error: true, Message: "Something went wrong!",
		}
		bytes, _ := json.Marshal(errResponse)
		_, err := w.Write(bytes)
		if err != nil {
			log.Println(err.Error())
		}
		return
	}

	w.WriteHeader(code)
	_, err = w.Write(data)
	if err != nil {
		log.Println(err.Error())
	}
}

func Api(w http.ResponseWriter, r *http.Request) {

	log.Println("Api triggered from", r.RemoteAddr)
	JSON(w, 201, Response{Error: false, Message: "its ok", Data: ""})
	return
}

type Data struct {
	id       string
	Date     string
	ClientId string
	OwnerId  string
	//Password                string
	WaterLevel              string
	WaterTemperature        string
	FlowRate                string
	WaterAcidity            string
	SalinityOfWater         string
	AirTemperature          string
	Sodium                  string
	Alkaline                string
	No3                     string
	Sulfate                 string
	WaterPermeability       string
	WaterOxygen             string
	Blurring                string
	Chlorophyll             string
	Fikosin                 string
	Ammonia                 string
	SuspendedSolids         string
	NitrogenDioxide         string
	AmmoniumIon             string
	HardnessOfTheWater      string
	ChemicalOxygenDemand    string
	BiochemicalOxygenDemand string
	Nitrite                 string
	Nitrate                 string
}

func (srv *Server) handleConnection(conn net.Conn) {

	log.Println("connection accepted", conn.RemoteAddr())
	defer func() {
		log.Println("Connection closed")
		err := conn.Close()
		if err != nil {
			return
		}

	}()

	defaultDataSize := 1024

	for {

		//var buffer bytes.Buffer
		reader := bufio.NewReader(conn)
		//writer := bufio.NewWriter(conn)

		data := make([]byte, defaultDataSize)

		for i := 0; i < defaultDataSize; i++ {

			data2, err := reader.ReadByte()
			if err != nil {
				data = data[:i]
				break
			}

			data[i] = data2

			if data2 == 42 {
				data = data[:i]
				break
			}
		}

		if len(data) == 0 {
			break
		}

		//w, _ := hex.DecodeString(data)
		_, err := conn.Write(data)
		if err != nil {
			log.Println("%n", err.Error())
			break
		}

		s := strings.Split(string(data), ",")
		log.Println(s)

		if len(s) < 27 {
			log.Println("error package length is lower than acceptable")
			break
		}

		if s[1] != "BetaXHackatrone2020" {
			log.Println(s[1])
			log.Println("Not allowed Owner Id")
			break
		}

		if (s[2] == "z$38rP?ap6Uc;3~C@>t&w'P7" && s[0] == "1") || (s[2] == "q`VWdA?Tghe~K6yzDsN[:$!$" && s[0] == "2") {

			vs := Data{
				ClientId: s[0],
				OwnerId:  "",

				WaterLevel:              s[3],
				WaterTemperature:        s[4],
				FlowRate:                s[5],
				WaterAcidity:            s[6],
				SalinityOfWater:         s[7],
				AirTemperature:          s[8],
				Sodium:                  s[9],
				Alkaline:                s[10],
				No3:                     s[11],
				Sulfate:                 s[12],
				WaterPermeability:       s[13],
				WaterOxygen:             s[14],
				Blurring:                s[15],
				Chlorophyll:             s[16],
				Fikosin:                 s[17],
				Ammonia:                 s[18],
				SuspendedSolids:         s[19],
				NitrogenDioxide:         s[20],
				AmmoniumIon:             s[21],
				HardnessOfTheWater:      s[22],
				ChemicalOxygenDemand:    s[23],
				BiochemicalOxygenDemand: s[24],
				Nitrite:                 s[25],
				Nitrate:                 s[26],
			}

			//send to user

			if len(srv.ConnectedUsers) > 0 {
				for _, v := range srv.ConnectedUsers {
					if err := v.WriteJSON(vs); err != nil {
						err := v.Close()
						if err != nil {
							log.Println(err.Error())
							break
						}

						log.Println(err)
						break
					}
				}
			}

			// perform a db.Query insert
			insert, err := srv.repo.Query("Insert into Data (ClientId, OwnerId, WaterLevel, WaterTemperature,"+
				" FLowRate, WaterAcidity, SalinityOfWater, AirTemperature, Sodium,Alkaline,No3,Sulfate,WaterPermeability,"+
				"WaterOxygen,Blurring,Chlorophyll,Fikosin,Ammonia,SuspendedSolids,NitrogenDioxide,AmmoniumIon,HardnessOfTheWater,"+
				"ChemicalOxygenDemand,BiochemicalOxygenDemand,Nitrite,Nitrate) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", vs.ClientId, vs.OwnerId, vs.WaterLevel,
				vs.WaterTemperature, vs.FlowRate, vs.WaterAcidity, vs.SalinityOfWater, vs.AirTemperature, vs.Sodium, vs.Alkaline, vs.No3, vs.Sulfate, vs.WaterPermeability, vs.WaterOxygen,
				vs.Blurring, vs.Chlorophyll, vs.Fikosin, vs.Ammonia, vs.SuspendedSolids, vs.NitrogenDioxide, vs.AmmoniumIon, vs.HardnessOfTheWater, vs.ChemicalOxygenDemand, vs.BiochemicalOxygenDemand, vs.Nitrite, vs.Nitrate)

			// if there is an error inserting, handle it
			if err != nil {
				log.Println(err.Error())
			}

			// be careful deferring Queries if you are using transactions
			defer func() {
				err := insert.Close()
				if err != nil {
					log.Println(err.Error())
				}
			}()
			//log.Println(len(srv.ConnectedUsers))
			//log.Println("new data received -->", string(data), conn.RemoteAddr(), vs.ClientId)
		} else {
			log.Println(s[2])
			log.Println("Wrong Password")
			break
		}
	}
}
