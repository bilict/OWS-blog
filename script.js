function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// Kontakt forma (ako je na stranici)
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };
    localStorage.setItem('contactFormData', JSON.stringify(data));
    document.getElementById('successMessage').style.display = 'block';
    this.reset();
});

// Pretraživanje
document.getElementById("searchInput")?.addEventListener("input", function() {
    const term = this.value.toLowerCase();
    document.querySelectorAll(".leftcolumn .card").forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
    });
});

// Modal - podaci za sve postove i sekcije
const postsData = {
    'machu-picchu': {
        title: 'Machu Picchu, Peru',
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Machu Picchu je drevni grad Inka smješten u peruanskim Andama. UNESCO-va je svjetska baština i jedno od najpoznatijih arheoloških lokaliteta na svijetu. Grad je izgrađen u 15. stoljeću i ostao je skoro netaknut do današnjih dana.',
        link: 'https://hr.wikipedia.org/wiki/Machu_Picchu'
    },
    'bagan': {
        title: 'Bagan, Mjanmar',
        image: 'https://images.unsplash.com/photo-1526203042074-45587ed26c02?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Bagan je arheološko nalazište u Mjanmaru, poznato po tisućama drevnih hramova i pagoda. To je jedno od najvažnijih budističkih nalazišta u jugoistočnoj Aziji i popularna turistička destinacija.',
        link: 'https://hr.wikipedia.org/wiki/Bagan'
    },
    'zhangye': {
        title: 'Nacionalni geopark Zhangye, Kina',
        image: 'https://images.unsplash.com/photo-1628402382626-d6078a447b48?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Nacionalni geopark Zhangye Danxia u Kini poznat je po svojim šarenim pješčenjačkim planinama. Ovo geološko čudo nastalo je erozijom i sedimentacijom tijekom milijuna godina.',
        link: 'https://hr.wikipedia.org/wiki/Nacionalni_geopark_Zhangye_Danxia'
    },
    'santorini': {
        title: 'Santorini, Grčka',
        image: 'https://images.unsplash.com/photo-1678266561093-324802646fb2?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Santorini je vulkanski otok u Egejskom moru, poznat po svojim bijelim kućama, plavim kupolama i prekrasnim zalascima sunca. To je jedno od najromantičnijih i najfotografiranijih mjesta u Grčkoj.',
        link: 'https://hr.wikipedia.org/wiki/Santorini'
    },
    'bora-bora': {
        title: 'Bora Bora',
        image: 'https://images.unsplash.com/photo-1676405328043-85738f8473ba?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Tropski raj, kristalno čisto more i prekrasni koraljni grebeni – idealno za odmor iz snova.',
        link: 'https://hr.wikipedia.org/wiki/Bora_Bora'
    },
    'ana-putnik': {
        title: 'Ana Putnik',
        image: 'images/Ana Putnik.jpg',
        text: 'Zovem se Ana Putnik i volim putovati po svijetu. Ovdje dijelim svoja iskustva, savjete i najljepše destinacije.',
        link: 'about.html'
    },
    'kaui': {
        title: 'Kaui, Havaji',
        image: 'https://images.unsplash.com/photo-1479603617559-65fbe1b8111d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Kauai je otok na Havajima poznat po bujnoj vegetaciji, kanjonima i prekrasnim plažama. Idealno je odredište za ljubitelje prirode i avanture.',
        link: 'https://hr.wikipedia.org/wiki/Kauai'
    },
    'banff': {
        title: 'Banff Nacionalni Park, Kanada',
        image: 'https://images.unsplash.com/photo-1635956743523-8856c84030ca?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Banff Nacionalni Park je najstariji nacionalni park u Kanadi. Poznat je po prekrasnim planinama, jezerima i bogatom životinjskom svijetu.',
        link: 'https://hr.wikipedia.org/wiki/Banff_Nacionalni_Park'
    },
    'uyuni': {
        title: 'Salar de Uyuni, Bolivija',
        image: 'https://plus.unsplash.com/premium_photo-1675747631203-f3a7431486c8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'Salar de Uyuni je najveća slana ravnica na svijetu. Poznat je po ogromnim površinama bijele soli koje stvaraju zapanjujuće efekte refleksije.',
        link: 'https://hr.wikipedia.org/wiki/Salar_de_Uyuni'
    }
};

function openModal(postId) {
    const post = postsData[postId];
    if (!post) return;

    document.getElementById('modalImage').src = post.image;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalText').textContent = post.text;
    document.getElementById('modalLink').href = post.link;
    document.getElementById('postModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('postModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('postModal');
    if (event.target === modal) {
        closeModal();
    }
}
