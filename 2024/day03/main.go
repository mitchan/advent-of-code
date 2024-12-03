package main

import (
	"fmt"
	"log"
	"regexp"
	"strconv"
	"strings"

	_ "embed"
)

//go:embed input.txt
var input string

func main() {
	re, err := regexp.Compile("mul\\(\\d+,\\d+\\)")
	if err != nil {
		log.Fatal("error: ", err)
	}

	matches := re.FindAllString(input, -1)

	sum := 0
	for _, match := range matches {
		s := strings.Replace(match, "mul(", "", 1)
		s = strings.Replace(s, ")", "", 1)

		split := strings.Split(s, ",")

		n1, err := strconv.ParseInt(split[0], 10, 64)
		if err != nil {
			log.Fatal(err)
		}

		n2, err := strconv.ParseInt(split[1], 10, 64)
		if err != nil {
			log.Fatal(err)
		}

		sum += int(n1) * int(n2)

	}

	fmt.Println("The sum is: ", sum)
}
