const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) //把x重新变为对象

const hashMap= xObject || [
    {logo:'S',url:'https://stackoverflow.com/'},
    {logo:'G',url:'https://github.com'},
]

const simplifyUrl = (url) => {
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')//删除/开头的内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close"><svg class="icon">
        <use xlink:href="#icon-shanchu"></use>
    </svg></div>
        </div></li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url,"_self")
        })
        $li.on('click','.close',(e)=>{
          e.stopPropagation()  //阻止冒泡
          hashMap.splice(index,1)//删除
          render()//重新渲染
        })
    })
}
render()

$('.addButton')
.on('click',()=>{
    let url = window.prompt('请输入需要添加的网址')
    if(url.indexOf('http')!==0){
        url = 'https://'+url
    }
    console.log(url)
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    });
    render()
});

window.onbeforeunload = ()=>{
  const string = JSON.stringify(hashMap)//对象变字符串
  localStorage.setItem('x',string)//在本地的存储里设置一个x，其值为string  
}

const keyboardLink = (e)=>{
    const{key} = e
    for(let i =0;i<hashMap.length;i++){
       if(hashMap[i].logo.toLowerCase() === key){
           window.open(hashMap[i].url,"_self")
       } 
    }}

$(document).on('keypress',keyboardLink)

$('.searchForm')
.on('keypress',(e)=>{
    e.stopPropagation();
}) //解决键盘输入跳转BUG