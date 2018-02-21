class Item < ApplicationRecord
  belongs_to :product
  belongs_to :order
  validates :order_id, presence: true
  validates :product_id, presence: true
  validates :price, presence: true
  validates :quantity, presence: true
  
  scope :item, -> order_id{where(order_id: order_id)}
  scope :total_quantities, ->{sum :quantity}
  scope :total_price, ->{sum :price}
  scope :time_in_range, ->(from_date, to_date){where created_at: from_date..to_date}

end
