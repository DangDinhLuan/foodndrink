class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.search_by_title(term, title)
    if term
      where("#{title}" ' LIKE ?', "%#{term}%")
    else
      all
    end
  end
end
