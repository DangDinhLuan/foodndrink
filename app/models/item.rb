class Item < ApplicationRecord
  belongs_to :product
  belongs_to :order
  validates :order_id, presence: true
  validates :product_id, presence: true
  validates :price, presence: true
  validates :quantity, presence: true
  
  scope :item, -> (id) { where(order_id: id) }
end
