class TemTestsController < ApplicationController
  before_action :set_tem_test, only: [:show, :edit, :update, :destroy]

  # GET /tem_tests
  # GET /tem_tests.json
  def index
    @tem_tests = TemTest.all
  end

  # GET /tem_tests/1
  # GET /tem_tests/1.json
  def show
  end

  # GET /tem_tests/new
  def new
    @tem_test = TemTest.new
  end

  # GET /tem_tests/1/edit
  def edit
  end

  # POST /tem_tests
  # POST /tem_tests.json
  def create
    @tem_test = TemTest.new(tem_test_params)

    respond_to do |format|
      if @tem_test.save
        format.html { redirect_to @tem_test, notice: 'Tem test was successfully created.' }
        format.json { render :show, status: :created, location: @tem_test }
      else
        format.html { render :new }
        format.json { render json: @tem_test.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tem_tests/1
  # PATCH/PUT /tem_tests/1.json
  def update
    respond_to do |format|
      if @tem_test.update(tem_test_params)
        format.html { redirect_to @tem_test, notice: 'Tem test was successfully updated.' }
        format.json { render :show, status: :ok, location: @tem_test }
      else
        format.html { render :edit }
        format.json { render json: @tem_test.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tem_tests/1
  # DELETE /tem_tests/1.json
  def destroy
    @tem_test.destroy
    respond_to do |format|
      format.html { redirect_to tem_tests_url, notice: 'Tem test was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tem_test
      @tem_test = TemTest.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tem_test_params
      params.require(:tem_test).permit(:name, :email)
    end
end
