package main

import (
	"io" //Descomentar en caso de usar ioWritestring
	"net/http"
	"fmt"
	"io/ioutil"
	"os"
	"encoding/json"
	"strings"
  
)


//Server function write================================

func writeonline(w http.ResponseWriter, r *http.Request) {	
	response, err := http.Get("http://localhost:8080/arreglo")
	if err != nil {
		fmt.Printf("%s", err)
		os.Exit(1)
	} else {
		defer response.Body.Close()
		contents, err := ioutil.ReadAll(response.Body)
		if err != nil {
		fmt.Printf("%s", err)
		os.Exit(1)
		}
	fmt.Printf("%s\n", string(contents))
	res := &Estructura{}
    	json.Unmarshal([]byte(string(contents)), &res)
	//sort.Float64s(res.Arreglo[1])
	if(strings.EqualFold(res.Metodo, "bubblesort")){	
		bubbleSort(res.Arreglo[1])
		test, _ := json.Marshal(res.Arreglo[2])
		io.WriteString(w,`{"arreglo":`+ string(test)+`}` )	
	}
	if(strings.EqualFold(res.Metodo, "mergesort")){
		sortedarray :=mergeSort(res.Arreglo[2])
		test, _ := json.Marshal(sortedarray)
		io.WriteString(w,`{"arreglo":`+ string(test)+`}` )
	}
	if(strings.EqualFold(res.Metodo, "quicksort")){	
		quickSort(res.Arreglo[1])
		test, _ := json.Marshal(res.Arreglo[2])
		io.WriteString(w,`{"arreglo":`+ string(test)+`}` )	
	}	
	//io.WriteString(w,`{"arreglo":`+ string(test)+`}` )
	}
}

//Sorts

//bubbleSort===========================================

func swap(list []float64, i, j int) {
	tmp := list[j]
	list[j] = list[i]
	list[i] = tmp
}

func bubbleSort(list []float64) {
	swapped := true;
	for swapped {
		swapped = false
		for i := 0; i < len(list) - 1; i++ {
			if list[i + 1] < list[i] {
				swap(list, i, i + 1)
				swapped = true
			}
		}
	}
}

//MergeSort============================================

func mergeSort(a []float64) []float64 {
	if len(a) <= 1 {
		return a
	}
	left := make([]float64, 0)
	right := make([]float64, 0)
	m := len(a) / 2
	for i, x := range a {
		switch {
			case i < m:
			left = append(left, x)
			case i >= m:
			right = append(right, x)
		}
	}
	left = mergeSort(left)
	right = mergeSort(right)
	return merge(left, right)
}

func merge(left, right []float64) []float64 {
	merged := make([]float64, 0)
	for len(left) > 0 || len(right) > 0 {
		if len(left) > 0 && len(right) > 0 {
			if left[0] <= right[0] {
			merged = append(merged, left[0])
			left = left[1:len(left)]
			} else {
				merged = append(merged, right[0])
				right = right[1:len(right)]
			}
		} else if len(left) > 0 {
			merged = append(merged, left[0])
			left = left[1:len(left)]
		} else if len(right) > 0 {
			merged = append(merged, right[0])
			right = right[1:len(right)]
		}
	}
return merged
}


//QuickSort================================================

func quickSort(a []float64) []float64 {
  if len(a) < 2 { return a }
  left, right := 0, len(a) - 1
  pivotIndex := len(a)/2
  a[pivotIndex], a[right] = a[right], a[pivotIndex]
  for i := range a {
    if a[i] < a[right] {
      a[i], a[left] = a[left], a[i]
      left++
    }
  }
  a[left], a[right] = a[right], a[left]
  quickSort(a[:left])
  quickSort(a[left + 1:])


  return a
}

type Estructura struct {
    Metodo   string      `json:"metodo"`
    Arreglo [][]float64  `json:"arreglo"`
}

//Program==========================================

func main() {

//===========================

//===========================	

	
	
	mux := http.NewServeMux() //Crea un server mux
	mux.HandleFunc("/", writeonline) //Se preocupa que el server mux ejecute la funcion dada
	http.ListenAndServe(":8000", mux)
	
}

