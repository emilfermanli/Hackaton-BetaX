package main

import (
	"bufio"
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"log"
	"net"
	"net/http"
	"os/exec"
	"sync"
	"time"
	_ "github.com/go-sql-driver/mysql"
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
	ConnectedUsers map[string]websocket.Conn

	repo *sql.DB
	//handler        *handler.UserHandler

	//databaseInsert string
	//gpsTrackerData map[string][]models.GpsTracker
	//heartbeatData  map[string][]models.HeartBeat
	Mu sync.Mutex

	debugMode bool
}

// (repo *repo.UserRepository)
func NewTcpServers(db * sql.DB) *Server {
	return &Server{

		repo:             db,
		ConnectedDevices: make(map[string]*conn, 1),
		ConnectedUsers:   make(map[string]websocket.Conn, 1),
		//gpsTrackerData:   make(map[string][]models.GpsTracker, 1),
		//heartbeatData:    make(map[string][]models.HeartBeat, 1),
		debugMode: false,
		//IdleTimeout:      resetTime,
		MaxReadBytes: 10,
	}
}

type UserHandler struct {
	//repo    *repo.UserRepository
	servers *Server
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
	defer db.Close()


	r := mux.NewRouter()

	srv := NewTcpServers(db)
	go srv.tcpServer(2299)

	r.HandleFunc("/wb", srv.WbEcho).Methods("GET")
	r.HandleFunc("/frontend", Frontend).Methods("GET")
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

	//srv.deleteUserConnection(token.UserId)
	wsConn, err := upGrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err.Error())
		return
	}

	log.Println("started go routine of socket ")

	//TODO add save and delete user

	// not to leave null connection
	defer func() {

		//TODO
		//srv.deleteUserConnection(token.UserId)
		err := wsConn.Close()
		if err != nil {
			return
		}
	}()

	for {

		var vs Ws

		_, s, err := wsConn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}

		err = json.Unmarshal([]byte(s), &vs)
		if err != nil {
			log.Println(err.Error())
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
	defer listener.Close()

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

	JSON(w, 201, Response{Error: false, Message: "its ok", Data: ""})
	log.Println("get api triggered")
	return
}

func (srv *Server) handleConnection(conn net.Conn) {

	log.Println("connection accepted", conn.RemoteAddr())
	defer func() {
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
		log.Println("receiver ready", []byte("*"))
		for i := 0; i < defaultDataSize; i++ {

			data2, err := reader.ReadByte()
			if err != nil {
				return
			}

			data[i] = data2

			if data2 == 42 {
				data = data[:i]
				log.Println("* interrupt")
				break
			}
		}

		//w, _ := hex.DecodeString(data)
		_, err := conn.Write(data)
		if err != nil {
			log.Println("%n", err.Error())
			return
		}

		vs := `{"message":"`+ string(data) +`"}`

		if len(srv.ConnectedUsers) > 0 {
			for _,v := range srv.ConnectedUsers {
				if err := v.WriteJSON(vs); err != nil {
					err := v.Close()
					if err != nil {
						return
					}
					return
				}
			}
		}


		log.Println("new data received -->", string(data))
	}
}
