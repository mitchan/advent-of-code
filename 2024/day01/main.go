package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	l1 := []int{}
	l2 := []int{}

	for scanner.Scan() {
		s := strings.Fields(scanner.Text())

		if len(s) != 2 {
			log.Fatal("len is not 2")
		}

		n1, err := strconv.ParseUint(s[0], 10, 64)
		if err != nil {
			log.Fatal(err)
		}
		l1 = append(l1, int(n1))

		n2, err := strconv.ParseUint(s[1], 10, 64)
		if err != nil {
			log.Fatal(err)
		}
		l2 = append(l2, int(n2))
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	sort.Ints(l1)
	sort.Ints(l2)

	sum := 0
	for index, v1 := range l1 {
		v2 := l2[index]

		diff := math.Abs(float64(v1) - float64(v2))
		sum += int(diff)
	}

	fmt.Println("The sum is: ", sum)
}
