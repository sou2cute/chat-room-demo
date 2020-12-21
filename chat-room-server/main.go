package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Starting server...")

	// indicate that we only create one room
	hub := newHub()
	go hub.run()

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.LoadHTMLGlob("home.html")
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.html", nil)
	})

	r.GET("/ws", func(c *gin.Context) {
		serveWs(hub, c.Writer, c.Request)
	})

	r.Run()
}
