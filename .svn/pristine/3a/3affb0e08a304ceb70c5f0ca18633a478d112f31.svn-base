const dataList = () =>{
  var str="深圳铁盒子全民健身跑";
  var arr=str.split('');
  var dataList={
    'person':[
      {'img':"../../images/hu.jpg"},
      {'img':"../../images/wd.jpg"},
      {'img':"../../images/hu.jpg"},
      {'img':"../../images/wd.jpg"},
      {'img':"../../images/hu.jpg"},
      {'img':"../../images/wd.jpg"},
      {'img':"../../images/hu.jpg"},
      {'img':"../../images/wd.jpg"},
      {'img':"../../images/hu.jpg"},
      {'img':"../../images/wd.jpg"},
      {'img':"../../images/hu.jpg"},
      {'img':"../../images/wd.jpg"},
      {'img':"../../images/hu.jpg"}
    ],
    'team':[
      { 'img': "../../images/hu.jpg" },
      { 'img': "../../images/wd.jpg" },
      { 'img': "../../images/hu.jpg" },
      { 'img': "../../images/wd.jpg" },
      { 'img': "../../images/hu.jpg" }
    ]
  }
  for(let k in dataList){
    for(let key of dataList[k]){
      key.name = arr[parseInt(Math.random() * 10)] + arr[parseInt(Math.random() * 10)] + arr[parseInt(Math.random() * 10)] + arr[parseInt(Math.random() * 10)] + arr[parseInt(Math.random() * 10)] + arr[parseInt(Math.random() * 10)];
      key.step = parseInt(Math.random() * 50000);
      // console.log(key);
    }
  }
  return dataList;
}
module.exports=({
  dataList: dataList 
})
