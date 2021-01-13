package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

var CTX = context.Background()

func main() {
	//
	rdb := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})
	_ = rdb.FlushDB(CTX).Err()

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
		serveWs(hub, rdb, c.Writer, c.Request)
	})

	r.Run()
}
