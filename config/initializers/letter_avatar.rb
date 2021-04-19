LetterAvatar.setup do |config|
  config.fill_color        = 'rgba(255, 255, 255, 1)' # default is 'rgba(255, 255, 255, 0.65)'
  config.cache_base_path   = 'public/system/lets'     # default is 'public/system'
  config.colors_palette    = :iwanthue                # default is :google
  config.annotate_position = '-0+10'                  # default is -0+5
  config.letters_count     = 2                        # default is 1
end
