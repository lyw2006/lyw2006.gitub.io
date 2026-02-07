// 全局变量
let currentLang = 'zh'; // 默认中文
let map = null; // 高德地图实例
let allMarkers = []; // 存储所有标注实例，用于管理

// 核心数据：北京非遗点位
const heritageData = [
  {
    id: 1,
    name: { zh: "北京燕京八绝博物馆", en: "Beijing Yanjing Eight Unique Crafts Museum" },
    address: { zh: "北京市石景山区模式口大街20号", en: "No.20 Moshikou Street, Shijingshan District, Beijing" },
    heritage: { zh: "金漆镶嵌、花丝镶嵌、景泰蓝、牙雕、玉雕、雕漆、京绣、宫毯", en: "Gold paint inlay, filigree inlay, cloisonne, ivory carving, jade carving, carved lacquerware, Beijing embroidery, palace carpet" },
    ticket: { zh: "门票30元/人", en: "Ticket 30 CNY per person" },
    time: { zh: "09:00-16:00，周一闭馆", en: "09:00-16:00, Closed on Monday" },
    desc: { zh: "馆内收藏燕京八绝工艺精品及古代木雕、根雕、石雕等数百件（套），博物馆主体建筑“承恩寺”为明代古建。", en: "Collects hundreds of Yanjing Eight Unique crafts and ancient wood, root and stone carvings. The main building Chengen Temple is an ancient building of the Ming Dynasty." },
    lng: 116.16475, lat: 39.935599
  },
  {
    id: 2,
    name: { zh: "吉兔坊兔儿爷体验基地", en: "Jitu Fang Rabbit God Experience Base" },
    address: { zh: "北京市通州区宋庄镇小堡村东区4号觉禅书院", en: "Juechan Academy, No.4 East Area, Xiaopu Village, Songzhuang Town, Tongzhou District, Beijing" },
    heritage: { zh: "兔儿爷制作与绘制", en: "Rabbit God Making and Painting" },
    ticket: { zh: "体验项目收费，参观免费", en: "Paid experience, free visit" },
    time: { zh: "09:00-18:00", en: "09:00-18:00" },
    desc: { zh: "北京规模较大的兔儿爷制作工作室，游客不仅可以体验兔儿爷的制作和绘制过程，还可以参观兔儿爷博物馆。", en: "One of the largest Rabbit God making studios in Beijing, offering making and painting experience and museum visit." },
    lng: 116.721753, lat:39.968746
  },
  {
    id: 3,
    name: { zh: "通州区文化馆", en: "Tongzhou District Cultural Center" },
    address: { zh: "北京市通州区通胡大街76号", en: "No.76 Tonghu Street, Tongzhou District, Beijing" },
    heritage: { zh: "通州骨雕制作技艺", en: "Tongzhou Bone Carving Craft" },
    ticket: { zh: "免费开放", en: "Free visit" },
    time: { zh: "09:00-17:00，周一闭馆", en: "09:00-17:00, Closed on Monday" },
    desc: { zh: "馆内设有非遗展厅，展示通州骨雕制作技艺等非遗项目。", en: "Has an intangible cultural heritage exhibition hall featuring local crafts such as Tongzhou bone carving." },
    lng:116.687358, lat: 39.912744
  },
  {
    id: 4,
    name: { zh: "北京市珐琅厂", en: "Beijing Enamel Factory" },
    address: { zh: "北京市东城区永外安乐林路10号", en: "No.10 Anlelin Road, Yongwai, Dongcheng District, Beijing" },
    heritage: { zh: "景泰蓝制作技艺", en: "Cloisonne Making Craft" },
    ticket: { zh: "免费参观，体验课收费", en: "Free visit, paid experience courses" },
    time: { zh: "09:00-16:00，周一闭馆", en: "09:00-16:00, Closed on Monday" },
    desc: { zh: "全国景泰蓝行业中唯一的一家中华老字号、国家级非物质文化遗产——景泰蓝制作技艺生产性保护示范基地，2012年创建了我国第一个景泰蓝艺术博物馆，陈设有各个时期的景泰蓝精品和众多经典作品。", en: "The only China Time-honored Brand in the national cloisonne industry, a national productive protection base for cloisonne making craft. Founded the first cloisonne art museum in China in 2012, displaying fine works of all periods." },
    lng:116.413373,lat:39.864055 
  },
  {
    id: 5,
    name: { zh: "北京龙顺成京作非遗博物馆", en: "Beijing Longshuncheng Beijing-style Furniture Intangible Heritage Museum" },
    address: { zh: "北京市东城区永外大街64号", en: "No.64 Yongwai Street, Dongcheng District, Beijing" },
    heritage: { zh: "京作硬木家具制作技艺、榫卯结构", en: "Beijing-style hardwood furniture making, mortise and tenon structure" },
    ticket: { zh: "成人票60元", en: "Adult ticket 60 CNY" },
    time: { zh: "09:00-17:00（16:30停止入馆）", en: "09:00-17:00 (Entry stop at 16:30)" },
    desc: { zh: "馆内通过三个主题单元展示该技艺源自宫廷的发展历程，还有大国工匠展呈现大师作品。这里不仅能参观，还能体验拆装榫卯结构、制作木质文创等非遗课程。", en: "Shows the court development history of the craft through three themes, with master craftsman exhibitions. Offers mortise and tenon disassembly experience and wood cultural creation courses." },
    lng: 116.4450, lat: 39.8580
  },
  {
    id: 6,
    name: { zh: "非遗展示中心（北馆）稻香湖非遗科学城", en: "Intangible Heritage Exhibition Center (North) Daoxianghu Intangible Heritage Science City" },
    address: { zh: "北京市海淀区苏家坨镇稻香湖景酒店内", en: "Inside Daoxiang Lake View Hotel, Sujiatuo Town, Haidian District, Beijing" },
    heritage: { zh: "京绣、京西皮影、脸谱、口技", en: "Beijing embroidery, West Beijing shadow puppetry, facial makeup, ventriloquism" },
    ticket: { zh: "免费开放，部分体验收费", en: "Free visit, paid for some experiences" },
    time: { zh: "09:00-17:30", en: "09:00-17:30" },
    desc: { zh: "展出京绣、京西皮影、脸谱、口技等千余件非遗作品，还设有传习教室，可让游客体验非遗制作。", en: "Displays more than 1,000 intangible heritage works such as Beijing embroidery, shadow puppetry, facial makeup and ventriloquism, with training classrooms for craft experiences." },
    lng: 116.181011,lat: 40.090177
  },
  {
    id: 7,
    name: { zh: "中国京西皮影非遗园", en: "China West Beijing Shadow Puppetry Intangible Heritage Park" },
    address: { zh: "北京市海淀区上庄镇白水洼路东800米", en: "800m East of Baishuiwa Road, Shangzhuang Town, Haidian District, Beijing" },
    heritage: { zh: "京西皮影制作与表演", en: "West Beijing Shadow Puppetry Making and Performance" },
    ticket: { zh: "门票60元，体验项目另收费", en: "Ticket 60 CNY, extra for experiences" },
    time: { zh: "09:00-18:00", en: "09:00-18:00" },
    desc: { zh: "一家以中国皮影戏为文化特色的沉浸式皮影艺术文化园，主要传承北京京西皮影。园区内有儿童皮影戏剧场、“一带一路”主题皮影艺术馆、皮影传习基地等，长期展出数万件古旧皮影艺术品，游客可体验皮影道具制作。", en: "Immersive shadow puppetry art park with Chinese shadow puppetry culture, inheriting West Beijing shadow puppetry. Has a children's shadow puppetry theater, a Belt and Road theme museum, displaying tens of thousands of ancient shadow puppets, production experience available." },
    lng: 116.217621, lat:40.137474
  },
  {
    id: 8,
    name: { zh: "北京民俗博物馆", en: "Beijing Folk Custom Museum" },
    address: { zh: "北京市朝阳区朝阳门外大街141号（东岳庙内）", en: "No.141 Chaoyangmen Outer Street, Chaoyang District, Beijing (Inside Dongyue Temple)" },
    heritage: { zh: "了解民俗文化", en: "Understand folk culture" },
    ticket: { zh: "免费开放", en: "Free visit" },
    time: { zh: "09:00-17:00", en: "09:00-17:00" },
    desc: { zh: "国家级非物质文化遗产“庙会（东岳庙庙会）”的保护单位，馆内收藏了大量的民俗文物和资料，展示北京传统民俗文化。", en: "National protection unit for the intangible cultural heritage of Dongyue Temple Fair, collecting a large number of folk cultural relics and displaying traditional Beijing folk culture." },
    lng:116.444002,lat: 39.925118 
  },
  {
    id: 9,
    name: { zh: "北京金漆镶嵌艺术博物馆", en: "Beijing Gold Paint Inlay Art Museum" },
    address: { zh: "北京市朝阳区小红门乡红寺村40号", en: "No.40 Hongsi Village, Xiaohongmen Township, Chaoyang District, Beijing" },
    heritage: { zh: "金漆镶嵌、玉石盆景", en: "Gold paint inlay, jade bonsai" },
    ticket: { zh: "免费参观", en: "Free visit" },
    time: { zh: "09:00-16:30，周一闭馆", en: "09:00-16:30, Closed on Monday" },
    desc: { zh: "馆内展出金漆镶嵌相关的非遗作品，搭配玉石盆景展示，能直观感受传统漆艺的精湛工艺，了解金漆镶嵌的制作流程和文化内涵。", en: "Exhibits intangible heritage works related to gold paint inlay, combined with jade bonsai displays, allowing visitors to feel the exquisite craftsmanship of traditional lacquer art and understand the production process and cultural connotation of gold paint inlay." },
    lng: 116.434822, lat: 39.835798
  },
  {
    id: 10,
    name: { zh: "中国工艺美术馆▪中国非物质文化遗产馆", en: "China National Arts and Crafts Museum, China Intangible Cultural Heritage Museum" },
    address: { zh: "北京市朝阳区湖景东路16号", en: "No.16 Hujing East Road, Chaoyang District, Beijing" },
    heritage: { zh: "金属锻錾镶嵌、京绣、刻瓷等多项非遗", en: "Metal forging and inlay, Beijing embroidery, porcelain carving and other intangible heritage" },
    ticket: { zh: "免费预约参观", en: "Free visit by reservation" },
    time: { zh: "09:00-17:00（16:30停止入馆），周一闭馆", en: "09:00-17:00 (Entry stop at 16:30), Closed on Monday" },
    desc: { zh: "位于北京中轴线北延长线上，馆内收藏了众多精美的非遗展品，涵盖多种传统工艺，是展示和传承中国非物质文化遗产的重要场馆。", en: "Located on the north extension of Beijing's central axis, the museum collects a large number of exquisite intangible heritage exhibits covering a variety of traditional crafts, and is an important venue for displaying and inheriting Chinese intangible cultural heritage." },
    lng:116.39758, lat: 40.003726
  },
  {
    id: 12,
    name: { zh: "北京戏曲博物馆", en: "Beijing Opera Museum" },
    address: { zh: "北京市西城区虎坊路3号", en: "No.3 Hufang Road, Xicheng District, Beijing" },
    heritage: { zh: "京胡制作技艺、京剧相关非遗", en: "Jinghu Fiddle Making Craft, Peking Opera related intangible heritage" },
    ticket: { zh: "免费开放", en: "Free visit" },
    time: { zh: "09:00-16:30，周一闭馆", en: "09:00-16:30, Closed on Monday" },
    desc: { zh: "馆内大厅正中展柜陈列着京胡制作大王史善朋为四大名旦量身定做的“四大名琴”，能直观感受京胡制作与京剧艺术的紧密关联，适合了解京胡适配不同演唱风格的制作特点。", en: "Displays the four famous Jinghu fiddles made by master Shi Shanpeng for the four great dan actors of Peking Opera, showing the close connection between Jinghu making and Peking Opera art, suitable for understanding the production characteristics of Jinghu adapted to different singing styles." },
    lng: 116.3980, lat: 39.8750
  },
  {
    id: 13,
    name: { zh: "荣宝斋", en: "Rongbaozhai" },
    address: { zh: "北京市西城区琉璃厂西街19号", en: "No.19 Liulichang West Street, Xicheng District, Beijing" },
    heritage: { zh: "木版水印技艺、装裱修复技艺", en: "Woodblock Watermarking, Mounting and Restoration Craft" },
    ticket: { zh: "免费参观", en: "Free visit" },
    time: { zh: "09:00-18:00", en: "09:00-18:00" },
    desc: { zh: "一家具有百年历史的中华老字号，其木版水印技艺和装裱修复技艺均为国家级非物质文化遗产，店内展示和销售各类传统书画、文房四宝等文创产品。", en: "A century-old China Time-honored Brand, its woodblock watermarking and mounting restoration crafts are national intangible cultural heritage, displaying and selling various traditional calligraphy and painting, stationery and other cultural and creative products in the store." },
    lng:116.384128, lat: 39.888897
  },
  {
    id: 14,
    name: { zh: "北京空竹博物馆", en: "Beijing Diabolo Museum" },
    address: { zh: "北京市西城区报国寺小星胡同9号", en: "No.9 Xiaoxing Hutong, Baoguo Temple, Xicheng District, Beijing" },
    heritage: { zh: "抖空竹技艺", en: "Diabolo Twirling Craft" },
    ticket: { zh: "免费开放", en: "Free visit" },
    time: { zh: "09:00-16:00，周一闭馆", en: "09:00-16:00, Closed on Monday" },
    desc: { zh: "2006年“抖空竹”被列入第一批国家级非物质文化遗产名录后，由广内街道规划建设。博物馆设有史话篇、工艺制作篇、抖空竹技艺篇等展览，以及空竹制作和销售互动展示区域，全面展示了空竹民俗文化的发展历史、制作工艺和抖动技法。", en: "Built by Guangnei Subdistrict after diabolo twirling was included in the first batch of national intangible cultural heritage in 2006. The museum has exhibitions on the history, production process and twirling skills of diabolo, as well as an interactive display area for diabolo production and sales, fully showing the development history, production process and twirling techniques of diabolo folk culture." },
    lng: 116.358522, lat: 39.890252
  }
];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initAmap(); // 初始化高德地图
    bindLangEvent(); // 绑定双语切换事件
    bindPopupCloseEvent(); // 绑定弹窗关闭事件
});

// 初始化高德地图核心方法
function initAmap() {
    // 创建地图实例，中心点为北京城区，缩放级别12
    map = new AMap.Map('amap-container', {
        center: [116.403874, 39.914885],
        zoom: 12,
        resizeEnable: true, // 窗口缩放自适应
        scrollWheel: true, // 允许鼠标滚轮缩放
        dragEnable: true // 允许拖拽地图
    });

    // 加载地图插件，渲染标注
  AMap.plugin(['AMap.Marker'], function() {
    renderMarkers(); // 渲染所有非遗点位标注
   }, {
    securityJsCode: "98601bf6e37f842c8606a372f4a1de98" // 安全密钥
});
}

// 非遗点位标注
function renderMarkers() {
    heritageData.forEach(item => {
        // 红色小圆标标注
        const marker = new AMap.Marker({
            position: [item.lng, item.lat],
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(12, 12), // 标注大小
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjYiIGZpbGw9IiNDODEwMUUiLz4KPGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjQiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
                imageSize: new AMap.Size(12, 12)
            }),
            anchor: 'bottom-center' // 标注锚点，精准对准经纬度
        });

        // 绑定标注点击事件，打开弹窗
        marker.on('click', function() {
            showPopup(item);
        });

        allMarkers.push(marker); // 存入标注数组，便于管理
    });
}

// 显示非遗详情弹窗（跟随标注点定位）
function showPopup(item) {
    const popup = document.getElementById('heritage-popup');
    const mapWrapper = document.querySelector('.amap-wrapper');
    const mapOffset = mapWrapper.getBoundingClientRect(); // 获取地图容器位置

    // 根据标注经纬度获取像素坐标，计算弹窗位置
    const pixel = map.lngLatToContainer([item.lng, item.lat]);
    popup.style.left = (pixel.x + mapOffset.left + 15) + 'px'; // 右移15px避开标注
    popup.style.top = (pixel.y + mapOffset.top + 15) + 'px';   // 下移15px避开标注
    popup.style.display = 'block';

    // 弹窗内容
    document.getElementById('popup-title').innerText = item.name[currentLang];
    document.getElementById('popup-address').innerText = item.address[currentLang];
    document.getElementById('popup-heritage').innerText = item.heritage[currentLang];
    document.getElementById('popup-ticket').innerText = item.ticket[currentLang];
    document.getElementById('popup-time').innerText = item.time[currentLang];
    document.getElementById('popup-desc').innerText = item.desc[currentLang];
}

// 双语切换
function bindLangEvent() {
    const zhBtn = document.getElementById('lang-zh');
    const enBtn = document.getElementById('lang-en');

    zhBtn.addEventListener('click', function() {
        if (currentLang !== 'zh') {
            currentLang = 'zh';
            updateLangStyle();
            refreshPopup(); // 刷新弹窗内容
        }
    });

    enBtn.addEventListener('click', function() {
        if (currentLang !== 'en') {
            currentLang = 'en';
            updateLangStyle();
            refreshPopup(); // 刷新弹窗内容
        }
    });
}

// 更新双语按钮激活样式
function updateLangStyle() {
    const zhBtn = document.getElementById('lang-zh');
    const enBtn = document.getElementById('lang-en');
    zhBtn.classList.toggle('active', currentLang === 'zh');
    enBtn.classList.toggle('active', currentLang === 'en');
}

// 绑定弹窗关闭事件
function bindPopupCloseEvent() {
    const closeBtn = document.getElementById('close-popup');
    const popup = document.getElementById('heritage-popup');

    // 按钮关闭
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // 弹窗外层空白处关闭
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
}

// 刷新弹窗内容
function refreshPopup() {
    const popup = document.getElementById('heritage-popup');
    if (popup.style.display !== 'block') return;

    // 获取当前弹窗标题，匹配对应点位数据
    const title = document.getElementById('popup-title').innerText;
    const item = heritageData.find(
        data => data.name.zh === title || data.name.en === title
    );

    if (item) showPopup(item);
}