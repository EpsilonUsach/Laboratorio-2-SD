class ArreglosController < ApplicationController
  ActionController::Parameters.permit_all_parameters = true
  before_action :set_arreglo, only: [:show, :edit, :update, :destroy]

  # GET /arreglos
  # GET /arreglos.json
  def index
    @arreglos = Arreglo.all
  end

  # GET /arreglos/1
  # GET /arreglos/1.json
  def show
  end

  # GET /arreglos/new
  def new
    @arreglo = Arreglo.new
  end

  # GET /arreglos/1/edit
  def edit
  end

  # POST /arreglos
  # POST /arreglos.json
  def create
    File.open('/home/vasco/Escritorio/Lab2SD/rubyweb/app/controllers/text.txt', 'r') do |f|
    	while line = f.gets
        @arreglo = Arreglo.new(params = ActionController::Parameters.new(numero: line)  )
        @arreglo.save
	end
        @arreglo.save
        respond_to do |format|
      if @arreglo.save
        format.html { redirect_to @arreglo, notice: 'Arreglo was successfully created.' }
        format.json { render :show, status: :created, location: @arreglo }
      else
        format.html { render :new }
        format.json { render json: @arreglo.errors, status: :unprocessable_entity }
      end
    end
    end
  end

  # PATCH/PUT /arreglos/1
  # PATCH/PUT /arreglos/1.json
  def update
    respond_to do |format|
      if @arreglo.update(arreglo_params)
        format.html { redirect_to @arreglo, notice: 'Arreglo was successfully updated.' }
        format.json { render :show, status: :ok, location: @arreglo }
      else
        format.html { render :edit }
        format.json { render json: @arreglo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /arreglos/1
  # DELETE /arreglos/1.json
  def destroy
    @arreglo.destroy
    respond_to do |format|
      format.html { redirect_to arreglos_url, notice: 'Arreglo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_arreglo
      @arreglo = Arreglo.find(params[:id])
    end
    def arreglo_params
      params.require(:arreglo).permit(:numero)
    end
end
