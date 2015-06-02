import urllib2
import json

def bubbleSort(array):
    for i in range(len(array)):
        for j in range(len(array)-1-i):
            if array[j] > array[j+1]:
                array[j], array[j+1] = array[j+1], array[j]   

def mergeSort(array):
    if len(array) > 1:

        mid = len(array) / 2        # Punto medio
        left = array[0:mid]
        right = array[mid:]

        mergeSort(left)            # Ordenar lado izquierdo
        mergeSort(right)           # Ordenar lado derecho

        l, r = 0, 0
        for i in range(len(array)):     # "Merge" ambos lados

            lval = left[l] if l < len(left) else None #Valor izquierdo
            rval = right[r] if r < len(right) else None #Valor derecho

            if (lval and rval and lval < rval) or rval is None:
                array[i] = lval
                l += 1
            elif (lval and rval and lval >= rval) or lval is None:
                array[i] = rval
                r += 1

def quickSort(array):
    if len(array) > 1:
        pivote = len(array) / 2 #Punto medio
        array1 = []
        array2 = []

        for i, val in enumerate(array):
            if i != pivote:
                if val < array[pivote]:
                    array1.append(val)
                else:
                    array2.append(val)

        quickSort(array1)   #Recursion al lado izquierdo
        quickSort(array2)   #Recursion al lado derecho
        array[:] = array1 + [array[pivote]] + array2

def JsonFile(array,metodo):
	archi=open('arreglo.json','w')
	archi.close()
	archi=open('arreglo.json','a')
	archi.write('{"metodo":"'+metodo+'","arreglo"'+':[')
	for i in range((len(array)-1)):
		archi.write(str(array[i])+',')
	archi.write(str(array[-1]))
	archi.write(']}')		
	archi.close()

response = urllib2.urlopen('http://localhost:8080/arreglo')
html = response.read()
array=json.loads(html)
array1=array["arreglo"][1]
metodo=array["metodo"]
if metodo=='quicksort':
	quickSort(array1)
if metodo=='bubblesort':
	bubbleSort(array1)
if metodo=='quicksort':
	mergeSort(array1)
JsonFile(array1,metodo)
