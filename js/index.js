$(document).ready(function() {
    // 瀑布流数据
    const newsData = [
        {
            image: './images/c1.png',
            title: '景德镇举办传统陶瓷艺术展',
            date: '2024-03-20',
            content: '展览展示了数百件精美的传统陶瓷作品，吸引了众多艺术爱好者...'
        },
        {
            image: './images/c2.png',
            title: '非遗传承人培训计划启动',
            date: '2024-03-18',
            content: '为推动传统工艺的传承与发展，文化部门启动新一轮培训计划...'
        },
        {
            image: './images/c3.png',
            title: '中国传统节日文化走进校园',
            date: '2024-03-15',
            content: '通过互动体验活动，让学生们深入了解传统节日文化的魅力...'
        },
        {
            image: './images/c4.png',
            title: '苏绣艺术展在巴黎开幕',
            date: '2024-03-12',
            content: '展现中国传统刺绣艺术的精湛技艺，获得国际观众的广泛赞誉...'
        },
        {
            image: './images/c5.png',
            title: '端午节民俗活动筹备工作启动',
            date: '2024-03-10',
            content: '各地积极筹备端午节民俗文化活动，让传统文化焕发新活力...'
        },
        {
            image: './images/c6.png',
            title: '传统木雕技艺保护项目获批',
            date: '2024-03-08',
            content: '该项目将系统性记录和保护传统木雕工艺，培养新一代传承人...'
        }
    ];

    // 生成瀑布流内容
    function generateWaterfall() {
        const container = $('.waterfall-container');
        newsData.forEach(news => {
            const newsItem = `
                <div class="news-item" data-aos="fade-up">
                    <img src="${news.image}" alt="${news.title}">
                    <div class="news-content">
                        <h3 class="news-title">${news.title}</h3>
                        <div class="news-date">${news.date}</div>
                        <p>${news.content}</p>
                    </div>
                </div>
            `;
            container.append(newsItem);
        });
    }

    // 返回顶部功能
    let lastScroll = 0;
    $(window).scroll(function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll - lastScroll > 50 || currentScroll < lastScroll) {
            if (currentScroll > 300) {
                $('#backToTop').addClass('visible');
            } else {
                $('#backToTop').removeClass('visible');
            }
            lastScroll = currentScroll;
        }
    });

    $('#backToTop').click(function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return false;
    });

    // 初始化瀑布流
    generateWaterfall();

    // 监听图片加载完成，触发重新布局
    $('.news-item img').on('load', function() {
        $(this).parent().addClass('loaded');
    });

    $(document).ready(function() {
        // 知识问答数据
        const quizData = {
            questions: [
                {
                    question: '端午节的传统食物是什么？',
                    options: ['粽子', '月饼', '汤圆', '饺子'],
                    correct: 0,
                    explanation: '端午节吃粽子源于纪念屈原，是中国传统节日重要的习俗之一。'
                },
                {
                    question: '下列哪个不是中国四大名绣？',
                    options: ['苏绣', '湘绣', '蜀绣', '燕绣'],
                    correct: 3,
                    explanation: '中国四大名绣是：苏绣、湘绣、蜀绣、粤绣。'
                },
                {
                    question: '景德镇以什么闻名？',
                    options: ['丝绸', '陶瓷', '漆器', '青铜器'],
                    correct: 1,
                    explanation: '景德镇被誉为"瓷都"，是中国著名的陶瓷生产基地。'
                },
                {
                    question: '中国传统建筑中的"飞檐"是指什么？',
                    options: ['屋顶转角上翘', '门框装饰', '窗户格局', '地基结构'],
                    correct: 0,
                    explanation: '飞檐是中国传统建筑屋顶边角向上翘起的部分，具有很高的艺术价值。'
                }
            ]
        };
    
        let currentQuestion = 0;
        let score = 0;
    
        // 显示问题和选项
        function showQuestion(index) {
            const question = quizData.questions[index];
            $('#dailyQuestion').text(question.question);
            
            let optionsHtml = '';
            question.options.forEach((option, i) => {
                optionsHtml += `<div class="quiz-option" data-index="${i}">${option}</div>`;
            });
            
            $('#quizOptions').html(optionsHtml);
            $('#quizFeedback').hide();
            $('#nextQuestion').hide();
        }
    
        // 检查答案
        function checkAnswer(selectedIndex) {
            const question = quizData.questions[currentQuestion];
            const isCorrect = selectedIndex === question.correct;
            
            $('.quiz-option').each(function() {
                const index = $(this).data('index');
                if (index === question.correct) {
                    $(this).addClass('correct');
                } else if (index === selectedIndex) {
                    $(this).addClass('wrong');
                }
            });
            
            $('#quizFeedback')
                .removeClass('correct wrong')
                .addClass(isCorrect ? 'correct' : 'wrong')
                .html(question.explanation)
                .fadeIn();
            
            if (isCorrect) {
                score += 10;
                $('#score').text(score);
            }
            
            $('#nextQuestion').fadeIn();
        }
    
        // 绑定选项点击事件
        $(document).on('click', '.quiz-option', function() {
            if ($(this).hasClass('correct') || $(this).hasClass('wrong')) return;
            const selectedIndex = $(this).data('index');
            checkAnswer(selectedIndex);
        });
    
        // 下一题按钮点击事件
        $('#nextQuestion').click(function() {
            currentQuestion = (currentQuestion + 1) % quizData.questions.length;
            showQuestion(currentQuestion);
        });
    
        // 初始化显示第一个问题
        showQuestion(0);
    });
}); 