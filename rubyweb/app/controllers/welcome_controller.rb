class WelcomeController < ApplicationController
#http://sandmoose.com/page/5
def partition_array(array, left, right, pivot_index)
  pivot_value = array[pivot_index]
  array[pivot_index], array[right] = array[right], array[pivot_index]
  store_index = left

  (left..right-1).each do |i|
    if array[i] < pivot_value
      array[i], array[store_index] = array[store_index], array[i]
      store_index = store_index + 1
    end
  end

  array[store_index], array[right] = array[right], array[store_index]
  return store_index
end

def inplace_quicksort(array, left, right)
  if left < right
    pivot_index = (left + ((right - left) / 2)).to_i
    new_pivot_index = partition_array(array, left, right, pivot_index)
    inplace_quicksort(array, left, new_pivot_index - 1)
    inplace_quicksort(array, new_pivot_index + 1, right)
  end

  return array
end

#BubbleSort http://www.sitepoint.com/sorting-algorithms-ruby
def bubble_sort(array)
  n = array.length
  loop do
    swapped = false

    (n-1).times do |i|
      if array[i] > array[i+1]
        array[i], array[i+1] = array[i+1], array[i]
        swapped = true
      end
    end

    break if not swapped
  end

  array
end

#MergeSort http://www.sitepoint.com/sorting-algorithms-ruby
def mergesort(array)
  def merge(left_sorted, right_sorted)
    res = []
    l = 0
    r = 0
 
    loop do
      break if r >= right_sorted.length and l >= left_sorted.length
 
      if r >= right_sorted.length or (l < left_sorted.length and left_sorted[l] < right_sorted[r])
        res << left_sorted[l]
        l += 1
      else
        res << right_sorted[r]
        r += 1
      end
    end
 
    return res
  end
 
  def mergesort_iter(array_sliced)
    return array_sliced if array_sliced.length <= 1
 
    mid = array_sliced.length/2 - 1
    left_sorted = mergesort_iter(array_sliced[0..mid])
    right_sorted = mergesort_iter(array_sliced[mid+1..-1])
    return merge(left_sorted, right_sorted)
  end
 
  mergesort_iter(array)
end
  def index
    response = HTTParty.get("http://localhost:8080/arreglo", :query => {:oauth_token => "abc"})
json = JSON.parse(response.body)
names=json["arreglo"][0]
if json["metodo"]=="quicksort"
	sorted_names = inplace_quicksort(names, 0, names.length - 1)
end
if json["metodo"]=="bubblesort"
	sorted_names=bubble_sort(names)
end
if json["metodo"]=="mergesort"
	sorted_names=mergesort(names)
end
File.open('/home/vasco/Escritorio/Lab2SD/rubyweb/app/controllers/text.txt', 'w') do |f|
  f.puts sorted_names
end 
  end
end
