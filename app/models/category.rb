class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  validates :title, presence: true

  def type
    if self.category_type
      "Drink"
    else
      "Food"
    end
  end
end
