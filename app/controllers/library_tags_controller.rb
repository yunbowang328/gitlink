class LibraryTagsController < ApplicationController
  def index
    library_tags = LibraryTag.all
    render_ok(library_tags: library_tags.as_json(only: %i[id name]), count: library_tags.size)
  end
end