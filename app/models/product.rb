class Product < ApplicationRecord
  belongs_to :category
  has_many :items
  has_many :ratings, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :category_id, presence: true
  validates :title, presence: true, length: {maximum: Settings.validates.title.length.maximum}
  validates :description, presence: true
  mount_uploader :image, ImageUploader
  validates :image, presence: true, allow_nil: true
  validates :price, presence: true
  validates :quantity, presence: true

  scope :recent, ->{order created_at: :desc}
  scope :top_rated, ->{order avg_rate: :desc}
  scope :related, -> product{where "category_id = ? and id <> ?", product.category_id, product.id}
  scope :filter, -> (category_id) {where(category_id: category_id).order created_at: :desc}
  
  def excerp
    self.description.truncate Settings.product.description.excerp, separator: /\s/
  end
  
  def update_ratings
    self.avg_rate = self.ratings.average :point
    self.rates = self.ratings.count :point
    self.save
  end

  def rated_by user
    if user && rated = self.ratings.where("user_id = ?", user.id).first
      rated.point
    end
  end
end
