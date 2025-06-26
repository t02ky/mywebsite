//セッション内初回訪問時のみアラートの表示
if (!sessionStorage.getItem('hasVisited')) {
    alert("みんな見てる～？(^_-)-☆");
    sessionStorage.setItem('hasVisited', 'true');
}

// スクロール時のフェードインアニメーションを設定
document.addEventListener('DOMContentLoaded', () => {

    // フェードインアニメーション用の設定
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // ビューポートを基準にする
        rootMargin: '0px',
        threshold: 0.1 // 10%表示されたら実行
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 要素がビューポート内に入ったら'visible'クラスを追加
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を停止
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 各要素を監視対象に追加
    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // スムーズスクロール (ヘッダーの高さ分を考慮)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // ヘッダーの高さを取得
                const headerOffset = document.querySelector('header').offsetHeight;
                // ターゲット要素の位置からヘッダーの高さを引く
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});