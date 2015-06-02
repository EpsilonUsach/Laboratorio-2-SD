json.array!(@arreglos) do |arreglo|
  json.extract! arreglo, :id, :numero
  json.url arreglo_url(arreglo, format: :json)
end
