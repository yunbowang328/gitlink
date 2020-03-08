module PdfkitHelper
  def download_image(url)
    'data:image/png;base64,' + Base64.encode64(open(url) { |io| io.read })
  end
end