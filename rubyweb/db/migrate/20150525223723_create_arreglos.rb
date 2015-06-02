class CreateArreglos < ActiveRecord::Migration
  def change
    create_table :arreglos do |t|
      t.float :numero

      t.timestamps null: false
    end
  end
end
