class Suggestion < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :user_id, presence: true
  validates :category_id, presence: true
  validates :title, presence: true,
    length: {maximum: Settings.validates.title.length.maximum}
  validates :image, presence: true
  mount_uploader :image, ImageUploader
  validates :description, presence: true
  validates :price, presence: true

  def excerp
    self.description.truncate Settings.product.description.excerp, separator: /\s/
  end

  def accept
    sefl.status = true
    sefl.save
  end

  def accepted?
    self.status
  end

end
