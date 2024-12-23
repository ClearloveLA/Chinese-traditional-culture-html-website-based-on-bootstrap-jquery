$(document).ready(function() {
    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Tab切换效果
    $('.craft-tabs .nav-link').click(function() {
        const category = $(this).data('bs-target').replace('#', '');
        
        if(category === 'all') {
            $('.craft-card').parent().show();
        } else {
            $('.craft-card').parent().hide();
            $(`.craft-card[data-category="${category}"]`).parent().show();
        }

        // 重新触发动画
        setTimeout(() => {
            $('.craft-card:visible').each(function(i) {
                $(this).addClass('show');
            });
        }, 100);
    });

    // 初始显示所有卡片
    $('.craft-card').addClass('show');

    // 点击了解更多按钮
    $('.learn-more').click(function() {
        const craftType = $(this).data('craft');
        loadCraftDetail(craftType);
    });

    // 加载工艺详情
    function loadCraftDetail(craftType) {
        $.ajax({
            url: 'data/crafts.json',
            method: 'GET',
            success: function(data) {
                const craftInfo = data[craftType];
                if (craftInfo) {
                    const modalContent = `
                    <div class="craft-detail">
                        <img src="${craftInfo.content.image}" class="craft-image img-fluid mb-4 rounded" style="cursor: pointer">
                        <h4>工艺特点</h4>
                        <ul>
                            ${craftInfo.content.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <h4>历史渊源</h4>
                        <p>${craftInfo.content.history}</p>
                        <h4>制作工艺</h4>
                        <p>${craftInfo.content.technique}</p>
                    </div>
                `;

                    $('#craftModal .modal-title').text(craftInfo.title);
                    $('#craftModal .modal-body').html(modalContent);
                    $('#craftModal').modal('show');
                }
            },
            error: function(xhr, status, error) {
                console.error('Ajax 请求失败:', error);
                console.log('状态:', status);
                console.log('响应:', xhr.responseText);
                alert('加载数据失败，请检查控制台获取详细信息');
            }
        });
    }

    // 导航栏滚动效果
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // 工艺类别筛选
    $('#craftCategory').change(function() {
        const category = $(this).val();
        if (category === '选择工艺类别') {
            $('.craft-card').parent().show();
        } else {
            $('.craft-card').parent().hide();
            $(`.craft-card:contains('${category}')`).parent().show();
        }
    });

$(document).on('click', '.craft-detail img', function() {
    const imgSrc = $(this).attr('src');
    $('#fullscreenImage').attr('src', imgSrc);
    $('#imageModal').modal('show');
});
});
