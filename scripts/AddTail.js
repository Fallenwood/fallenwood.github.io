const fs = require('fs');

hexo.extend.filter.register('before_post_render', function(data){
  if (data.copyright === false) {
    return data;
  }
  
  data.content += '\n___\n';
  
  try {
    const file_content = fs.readFileSync('./source/_uitls/tail.md');
    if(file_content && data.content.length > 50) {
      data.content += file_content;
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;

  }

  const permalink = '\n本文链接：' + data.permalink;
  data.content += permalink;
  
  return data;
});