package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"

	_ "embed"
)

//go:embed input.txt
var input string

const (
	Idle Mode = iota
	Increasing
	Decreasing
)

type Mode int

func main() {
	rows := strings.Split(input, "\n")
	validRowsCount := 0

	for _, row := range rows {
		values := strings.Fields(row)

		if len(values) == 0 {
			continue
		}

		valid := true
		mode := Idle
		var lastNum int64 = 0

		for index, value := range values {
			// parse number
			n, err := strconv.ParseInt(value, 10, 64)
			if err != nil {
				log.Fatal(err)
			}

			if index == 0 {
				lastNum = n
				continue
			}

			diff := lastNum - n
			lastNum = n

			if diff == 0 || diff > 3 || diff < -3 {
				valid = false
				break
			}

			if diff < 0 {
				if mode == Idle {
					mode = Decreasing
				} else if mode == Increasing {
					valid = false
					break
				}
			} else {
				if mode == Idle {
					mode = Increasing
				} else if mode == Decreasing {
					valid = false
					break
				}
			}
		}

		if valid {
			validRowsCount += 1
		}
	}

	fmt.Println("The count of valid rows is: ", validRowsCount)
}
