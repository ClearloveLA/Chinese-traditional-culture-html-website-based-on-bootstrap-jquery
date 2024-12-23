$(document).ready(function () {
  // 初始化 AOS 动画库
  AOS.init({
    duration: 1000,
    once: true
  });

  // 导航栏滚动效果
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // 节日详情模态框数据
  const festivalData = {
    spring: {
      title: '春节',
      content: `
                <div class="festival-detail">
                    <img src="images/spring-festival-detail.jpg" class="img-fluid mb-3">
                    <h4>春节习俗</h4>
                    <ul>
                        <li>贴春联</li>
                        <li>放鞭炮</li>
                        <li>吃团圆饭</li>
                        <li>发红包</li>
                    </ul>
                    <p>春节是中国人最重要的传统节日，寓意着阖家团圆、辞旧迎新...</p>
                </div>
            `
    }
  };

  // 点击查看详情
  $('.show-details').click(function () {
    const festival = $(this).data('festival');
    const data = festivalData[festival];

    $('#festivalModal .modal-title').text(data.title);
    $('#festivalModal .modal-body').html(data.content);
    $('#festivalModal').modal('show');
  });

  // 农历节日数据（使用公历日期进行演示）
  const festivals = [
    { name: '春节', date: '2025-02-10' },
    { name: '元宵节', date: '2025-02-24' },
    { name: '清明节', date: '2025-04-05' },
    { name: '端午节', date: '2025-06-01' },
    { name: '中秋节', date: '2024-09-17' },
    { name: '重阳节', date: '2024-10-13' }
  ];

  // 更新时钟显示
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = now.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    });
    
    $('#digital-clock').text(timeString);
    $('#current-date').text(dateString);
  }

  // 获取下一个节日
  function getNextFestival() {
    const now = new Date();
    let nextFestival = null;
    let minDiff = Infinity;

    festivals.forEach(festival => {
      const festivalDate = new Date(festival.date);
      const timeDiff = festivalDate - now;
      
      if (timeDiff > 0 && timeDiff < minDiff) {
        minDiff = timeDiff;
        nextFestival = {
          name: festival.name,
          date: festivalDate
        };
      }
    });

    return nextFestival;
  }

  // 更新倒计时
  function updateCountdown() {
    const nextFestival = getNextFestival();
    if (!nextFestival) return;

    const now = new Date();
    const diff = nextFestival.date - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    $('#next-festival').text(`距离${nextFestival.name}还有`);
    $('#countdown-days').text(String(days).padStart(2, '0'));
    $('#countdown-hours').text(String(hours).padStart(2, '0'));
    $('#countdown-minutes').text(String(minutes).padStart(2, '0'));
    $('#countdown-seconds').text(String(seconds).padStart(2, '0'));
  }

  // 初始化时钟和倒计时
  updateClock();
  updateCountdown();
  
  // 设置定时器
  setInterval(updateClock, 1000);
  setInterval(updateCountdown, 1000);
});