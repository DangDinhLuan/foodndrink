class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  validates :title, presence: true
  validates :category_type, format: {with: /food|drink/i}
  before_save {self.category_type = self.category_type.downcase}

  scope :recent, ->{order created_at: :desc}
  
  def type
    self.category_type.capitalize
  end

  def self.search_by_title(term)
    if term
      where('title LIKE ?', "%#{term}%")
    else
      all
    end
  end

end
