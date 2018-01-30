class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  validates :title, presence: true
  validates :category_type, format: {with: /food|drink/i}
  before_save {self.category_type = self.category_type.downcase}

  scope :recent, ->{order created_at: :desc}
  scope :filter, -> (category_type) {where(category_type: category_type).order created_at: :desc}
  
  def type
    self.category_type.capitalize
  end

end
