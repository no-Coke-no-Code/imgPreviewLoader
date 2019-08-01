function imageLoader(){};
imageLoader.prototype = {
    getEleById:function(id){
        return document.getElementById(id);
    },
    // 获取input获取到的file，进行检验，后将其转换为base64编码格式(用于预览)
    handle:function(e){
        let target = e.target.files[0];
        let size = target.size;
        let type = target.type;
        let regExp = /image\//;
        if(!regExp.test(type))
        {
            alert("请上传图片文件");
            document.getElementById("fileInput").value = "";
            return;
        }
        if(size > 3*1024*1024)
        {
            alert("上传的图片不能大于3M!!");
            document.getElementById("fileInput").value = "";
            return;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(target);
        fileReader.onload = function(ex){
            previewPic.src = ex.target.result;
        };
    },
    // 对base64编码进行解码,并将其转为二进制编码写入到一个Blob对象中，并指定Blob对象的类型
    // 注:File对象也是继承于Blob对象的   new File([数据],name,option)
    base64ToUnicode:function(target){
        var ascill = window.atob(target);
        var arrayBuffer = new ArrayBuffer(ascill.length);
        var uInt8Array = new Uint8Array(arrayBuffer);
        for(let i = 0;i<ascill.length;i++)
        {
            uInt8Array[i] = ascill.charCodeAt(i);
        }
        return new Blob([arrayBuffer],{type:"image/png"});
    },
};

window.onload = function(){
    var loader = new imageLoader();
    let fileInput = loader.getEleById("fileInput");
    let previewPic = loader.getEleById("previewPic");
    let submitBtn = loader.getEleById("submitBtn");

    fileInput.addEventListener('change',loader.handle);
    submitBtn.addEventListener('click',function(){
        if(fileInput.value)
        {
            let base64 = previewPic.src.split(",")[1];
            let imgFile = loader.base64ToUnicode(base64);
            // 在这里后面进行上传图片操作
        }
        else
        {
            alert("请先选择图片");
        }
    });
};  