package main

import (
	"fmt"
	"log"
	"math"
	"sort"
	"strconv"
	"strings"

	_ "embed"
)

//go:embed input.txt
var input string

func main() {
	rows := strings.Split(input, "\n")

	l1 := []int{}
	l2 := []int{}
	counters := make(map[int]int)

	for _, row := range rows {
		s := strings.Fields(row)

		if len(s) != 2 {
			continue
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

		value, ok := counters[int(n2)]
		if ok {
			counters[int(n2)] = value + 1
		} else {
			counters[int(n2)] = 1
		}
	}

	sort.Ints(l1)
	sort.Ints(l2)

	part1(l1, l2)
	part2(l1, counters)
}

func part1(l1, l2 []int) {
	sum := 0
	for index, v1 := range l1 {
		v2 := l2[index]

		diff := math.Abs(float64(v1) - float64(v2))
		sum += int(diff)
	}

	fmt.Println("part1 - The sum is: ", sum)
}

func part2(l1 []int, counters map[int]int) {
	sum := 0
	for _, v1 := range l1 {
		value, ok := counters[v1]
		if ok {
			sum += v1 * value
		}
	}

	fmt.Println("part2 - The sum is: ", sum)
}
