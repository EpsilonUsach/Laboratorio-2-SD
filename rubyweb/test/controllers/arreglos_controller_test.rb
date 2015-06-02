require 'test_helper'

class ArreglosControllerTest < ActionController::TestCase
  setup do
    @arreglo = arreglos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:arreglos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create arreglo" do
    assert_difference('Arreglo.count') do
      post :create, arreglo: { numero: @arreglo.numero }
    end

    assert_redirected_to arreglo_path(assigns(:arreglo))
  end

  test "should show arreglo" do
    get :show, id: @arreglo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @arreglo
    assert_response :success
  end

  test "should update arreglo" do
    patch :update, id: @arreglo, arreglo: { numero: @arreglo.numero }
    assert_redirected_to arreglo_path(assigns(:arreglo))
  end

  test "should destroy arreglo" do
    assert_difference('Arreglo.count', -1) do
      delete :destroy, id: @arreglo
    end

    assert_redirected_to arreglos_path
  end
end
