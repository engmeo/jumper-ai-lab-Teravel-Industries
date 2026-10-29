# Jumper AI Lab â€” Luá»“ng cÃ´ng viá»‡c chÃ­nh (Workstreams)

> TÃ i liá»‡u tá»•ng quan bá»• sung cho README chÃ­nh. SÆ¡ Ä‘á»“ thá»ƒ hiá»‡n quan há»‡ phá»¥ thuá»™c giá»¯a 5 luá»“ng cÃ´ng viá»‡c; danh sÃ¡ch bÃªn dÆ°á»›i liÃªn káº¿t tá»›i hÆ°á»›ng dáº«n Markdown cá»§a 15 vá»‹ trÃ­ trong `docs/roles/`.
>
> **NguyÃªn táº¯c pháº¡m vi:** trÆ°á»›c khi cÃ³ robot tháº­t, Æ°u tiÃªn tÃ i liá»‡u, pipeline dá»¯ liá»‡u cÃ³ sáºµn, mÃ´ phá»ng, baseline, benchmark vÃ  CI. CÃ¡c má»¥c cáº§n cáº£m biáº¿n/robot tháº­t pháº£i ghi rÃµ **chá» pháº§n cá»©ng**. KhÃ´ng coi káº¿t quáº£ mÃ´ phá»ng lÃ  báº±ng chá»©ng Ä‘Ã£ kiá»ƒm thá»­ an toÃ n ngoÃ i Ä‘á»i.

## 1. SÆ¡ Ä‘á»“ luá»“ng cÃ´ng viá»‡c cÃ³ liÃªn káº¿t

GitHub cÃ³ thá»ƒ cháº·n hoáº·c khÃ´ng kÃ­ch hoáº¡t liÃªn káº¿t `click` bÃªn trong Mermaid á»Ÿ má»™t sá»‘ cháº¿ Ä‘á»™ hiá»ƒn thá»‹. VÃ¬ váº­y, sÆ¡ Ä‘á»“ dÆ°á»›i Ä‘Ã¢y Ä‘i kÃ¨m danh sÃ¡ch liÃªn káº¿t trá»±c tiáº¿p tá»›i tá»«ng hÆ°á»›ng dáº«n á»Ÿ má»¥c 3.

```mermaid
flowchart TD
    A["Äiá»u phá»‘i dá»± Ã¡n / Kiáº¿n trÃºc há»‡ thá»‘ng"]
    B["WS4: Sandbox mÃ´ phá»ng cÆ¡ báº£n"]
    C["WS1: Dá»¯ liá»‡u & tri thá»©c chuyÃªn gia"]
    D["WS2: Baseline AI/ML"]
    E["WS3: Benchmark tá»± Ä‘á»™ng"]
    F["WS5: ÄÃ³ng gÃ³i ká»¹ nÄƒng + CI"]
    G["Khi cÃ³ Jumper: tÃ­ch há»£p driver/sensor"]
    H["Kiá»ƒm thá»­ an toÃ n thá»±c táº¿ + Sim-to-Real"]
    I["BÃ n giao triá»ƒn khai"]

    A --> B
    A --> C
    B --> D
    C --> D
    B --> E
    D --> E
    D --> F
    E --> F
    F --> G --> H --> I

    click A "docs/roles/01-dieu-phoi-kien-truc.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 01"
    click B "docs/roles/10-sandbox-mo-phong.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 10"
    click C "docs/roles/02-thu-thap-du-lieu.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 02"
    click D "docs/roles/06-baseline-ai-ml.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 06"
    click E "docs/roles/12-benchmark-danh-gia.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 12"
    click F "docs/roles/14-dong-goi-skill-ci.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 14"
    click G "docs/roles/15-tich-hop-phan-cung-an-toan.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 15"
    click H "docs/roles/15-tich-hop-phan-cung-an-toan.md" "Má»Ÿ hÆ°á»›ng dáº«n vá»‹ trÃ­ 15"
    click I "docs/roles/14-dong-goi-skill-ci.md" "Má»Ÿ hÆ°á»›ng dáº«n bÃ n giao"
```

## 2. Tá»•ng quan 5 Workstream

### WS1 â€” Dá»¯ liá»‡u vÃ  Tri thá»©c ChuyÃªn gia (Data & Expert Knowledge)

**Má»¥c tiÃªu:** biáº¿n dá»¯ liá»‡u thao tÃ¡c vÃ  kiáº¿n thá»©c chuyÃªn gia thÃ nh dá»¯ liá»‡u cÃ³ cáº¥u trÃºc, cÃ³ thá»ƒ kiá»ƒm tra vÃ  tÃ¡i sá»­ dá»¥ng.

- **Nhiá»‡m vá»¥:** thu tháº­p video thao tÃ¡c; khi cÃ³ thiáº¿t bá»‹ phÃ¹ há»£p, ghi Ä‘á»“ng thá»i dá»¯ liá»‡u cáº£m biáº¿n nhÆ° vá»‹ trÃ­ khá»›p, tÆ° tháº¿ vÃ  lá»±c/mÃ´-men. Chia quy trÃ¬nh thÃ nh cÃ¡c bÆ°á»›c tiáº¿p cáº­n â†’ tiáº¿p xÃºc â†’ thao tÃ¡c â†’ hoÃ n thÃ nh â†’ rÃºt lui; gáº¯n nhÃ£n má»¥c tiÃªu vÃ  Ä‘iá»u kiá»‡n thÃ nh cÃ´ng. XÃ¢y dá»±ng pipeline Ä‘á»“ng bá»™ timestamp, trÃ­ch xuáº¥t, chuáº©n hÃ³a schema vÃ  metadata.
- **Vai trÃ² chá»‹u trÃ¡ch nhiá»‡m:** Ká»¹ sÆ° thu tháº­p dá»¯ liá»‡u, Ká»¹ sÆ° xá»­ lÃ½ dá»¯ liá»‡u, ChuyÃªn gia ká»¹ nÄƒng/tri thá»©c, Ká»¹ sÆ° dá»¯ liá»‡u/quáº£n lÃ½ tri thá»©c; phá»‘i há»£p vá»›i Äiá»u phá»‘i/Kiáº¿n trÃºc há»‡ thá»‘ng.
- **Äáº§u vÃ o:** video RGB/RGB-D vÃ  quy trÃ¬nh thao tÃ¡c; dá»¯ liá»‡u cáº£m biáº¿n khi cÃ³ pháº§n cá»©ng.
- **Äáº§u ra:** dataset trÃ¬nh diá»…n cÃ³ cáº¥u trÃºc, cÃ´ng cá»¥ xá»­ lÃ½, schema cÃ³ giáº£i thÃ­ch Ä‘Æ¡n vá»‹, metadata vÃ  bÃ¡o cÃ¡o cháº¥t lÆ°á»£ng.
- **TiÃªu chÃ­ nghiá»‡m thu:** trÆ°á»ng dá»¯ liá»‡u vÃ  Ä‘Æ¡n vá»‹ Ä‘Æ°á»£c mÃ´ táº£; metadata rÃµ; pipeline cháº¡y láº¡i trÃªn dá»¯ liá»‡u máº«u cÃ³ káº¿t quáº£ kiá»ƒm tra Ä‘Æ°á»£c; lá»—i thiáº¿u dá»¯ liá»‡u/nhÃ£n mÆ¡ há»“ Ä‘Æ°á»£c bÃ¡o cÃ¡o. Náº¿u chÆ°a cÃ³ sensor, ghi rÃµ dataset video-only, khÃ´ng giáº£ Ä‘á»‹nh cÃ³ joint state hay lá»±c.
- **Effort:** **M**.
- **Phá»¥ thuá»™c:** quy trÃ¬nh thao tÃ¡c vÃ  dá»¯ liá»‡u Ä‘áº§u vÃ o; thiáº¿t bá»‹ quay/cáº£m biáº¿n lÃ  phá»¥ thuá»™c cho thu tháº­p Ä‘a phÆ°Æ¡ng thá»©c.
- **Rá»§i ro:** dá»¯ liá»‡u nhiá»…u hoáº·c thiáº¿u, timestamp khÃ´ng Ä‘á»“ng bá»™, nhÃ£n mÆ¡ há»“, video khÃ´ng chá»©a lá»‡nh Ä‘iá»u khiá»ƒn hoáº·c tráº¡ng thÃ¡i cáº£m biáº¿n.

**HÆ°á»›ng dáº«n liÃªn quan:** [02 â€” Thu tháº­p dá»¯ liá»‡u](docs/roles/02-thu-thap-du-lieu.md) Â· [03 â€” Xá»­ lÃ½ dá»¯ liá»‡u](docs/roles/03-xu-ly-du-lieu.md) Â· [04 â€” ChuyÃªn gia ká»¹ nÄƒng](docs/roles/04-chuyen-gia-ky-nang.md) Â· [05 â€” Quáº£n lÃ½ tri thá»©c](docs/roles/05-quan-ly-tri-thuc.md)

### WS2 â€” MÃ´ hÃ¬nh CÄƒn báº£n vÃ  Khá»Ÿi táº¡o (Baseline Models)

**Má»¥c tiÃªu:** xÃ¢y dá»±ng baseline Ä‘Æ¡n giáº£n, Ä‘o Ä‘Æ°á»£c vÃ  tÃ¡i láº­p trÆ°á»›c khi má»Ÿ rá»™ng sang mÃ´ hÃ¬nh phá»©c táº¡p.

- **Nhiá»‡m vá»¥:**
  - **D2.1 â€” TÃ¡i táº¡o quá»¹ Ä‘áº¡o:** thá»­ GMM/GPR hoáº·c phÆ°Æ¡ng phÃ¡p thá»‘ng kÃª phÃ¹ há»£p Ä‘á»ƒ mÃ´ hÃ¬nh hÃ³a/ná»™i suy chuá»—i Ä‘iá»ƒm; Ä‘o sai sá»‘ vÃ  Ä‘á»™ mÆ°á»£t.
  - **D2.2 â€” Behavior Cloning RNN/LSTM:** nghiÃªn cá»©u khi cÃ³ dá»¯ liá»‡u dáº¡ng chuá»—i tráº¡ng thÃ¡i â†’ hÃ nh Ä‘á»™ng phÃ¹ há»£p; so sÃ¡nh vá»›i baseline Ä‘Æ¡n giáº£n vÃ  theo dÃµi lá»—i tÃ­ch lÅ©y.
  - **D2.3 â€” Äáº§u vÃ o Ä‘a phÆ°Æ¡ng thá»©c:** chá»‰ tÃ­ch há»£p áº£nh, joint state vÃ  lá»±c khi cÃ¡c nguá»“n dá»¯ liá»‡u thá»±c sá»± cÃ³ sáºµn vÃ  Ä‘á»“ng bá»™.
  - **D2.4 â€” Inverse Reinforcement Learning (IRL):** háº¡ng má»¥c nghiÃªn cá»©u thá»­ nghiá»‡m trÃªn tÃ¡c vá»¥ nhá», so sÃ¡nh vá»›i behavior cloning.
  - **D2.5 â€” GAN / tÄƒng cÆ°á»ng dá»¯ liá»‡u:** háº¡ng má»¥c nghiÃªn cá»©u tÃ¹y chá»n; chá»‰ giá»¯ náº¿u cáº£i thiá»‡n Ä‘Æ°á»£c chá»‰ sá»‘ Ä‘Ã¡nh giÃ¡.
- **Vai trÃ² chá»‹u trÃ¡ch nhiá»‡m:** NghiÃªn cá»©u viÃªn AI/ML, Ká»¹ sÆ° AI/ML, Ká»¹ sÆ° há»c báº¯t chÆ°á»›c, Ká»¹ sÆ° há»c tÄƒng cÆ°á»ng/huáº¥n luyá»‡n, ChuyÃªn gia Ä‘iá»u khiá»ƒn.
- **Äáº§u vÃ o:** dá»¯ liá»‡u Ä‘Ã£ chuáº©n hÃ³a tá»« WS1 vÃ  sandbox/replay tá»« WS4.
- **Äáº§u ra:** mÃ£ huáº¥n luyá»‡n, cáº¥u hÃ¬nh, checkpoint, log, hÆ°á»›ng dáº«n cháº¡y vÃ  káº¿t quáº£ benchmark.
- **TiÃªu chÃ­ nghiá»‡m thu:** cÃ³ baseline Ä‘á»ƒ so sÃ¡nh; metrics rÃµ (vÃ­ dá»¥ MSE, Ä‘á»™ mÆ°á»£t, success rate náº¿u cÃ³ tÃ¡c vá»¥ thá»±c thi); ngÆ°á»i khÃ¡c cÃ³ thá»ƒ cháº¡y láº¡i theo hÆ°á»›ng dáº«n. KhÃ´ng tuyÃªn bá»‘ thÃ nh cÃ´ng náº¿u chÆ°a cháº¡y thá»­.
- **Effort:** **Mâ€“L**.
- **Phá»¥ thuá»™c:** WS1 vá» dá»¯ liá»‡u; WS4 vá» mÃ´i trÆ°á»ng Ä‘Ã¡nh giÃ¡.
- **Rá»§i ro:** quÃ¡ khá»›p, thiáº¿u kháº£ nÄƒng khÃ¡i quÃ¡t, dá»¯ liá»‡u khÃ´ng Ä‘á»§ cháº¥t lÆ°á»£ng; mÃ´ hÃ¬nh phá»©c táº¡p khÃ´ng táº¡o cáº£i thiá»‡n Ä‘Ã¡ng ká»ƒ.

**HÆ°á»›ng dáº«n liÃªn quan:** [06 â€” Baseline AI/ML](docs/roles/06-baseline-ai-ml.md) Â· [07 â€” Há»c báº¯t chÆ°á»›c](docs/roles/07-hoc-bat-chuoc.md) Â· [08 â€” Há»c tÄƒng cÆ°á»ng](docs/roles/08-hoc-tang-cuong.md) Â· [09 â€” Äiá»u khiá»ƒn robot](docs/roles/09-dieu-khien-robot.md)

### WS3 â€” Kiá»ƒm thá»­ vÃ  ÄÃ¡nh giÃ¡ (Testing & Benchmark)

**Má»¥c tiÃªu:** Ä‘Ã¡nh giÃ¡ mÃ´ hÃ¬nh/ká»¹ nÄƒng báº±ng ká»‹ch báº£n, sá»‘ liá»‡u vÃ  bÃ¡o cÃ¡o cÃ³ thá»ƒ láº·p láº¡i.

- **Nhiá»‡m vá»¥:** xÃ¢y dá»±ng bÃ i test cho **tÃ¡i táº¡o (reproduction)**, **khÃ¡i quÃ¡t hÃ³a (generalization)** vÃ  **á»©ng biáº¿n lá»±c (force-adaptation)**. Äo tá»· lá»‡ hoÃ n thÃ nh, sai sá»‘, thá»i gian; thay Ä‘á»•i vá»‹ trÃ­/hÆ°á»›ng má»¥c tiÃªu; mÃ´ phá»ng hoáº·c kiá»ƒm tra pháº£n á»©ng khi ma sÃ¡t/lá»±c thay Ä‘á»•i náº¿u mÃ´i trÆ°á»ng há»— trá»£.
- **Vai trÃ² chá»‹u trÃ¡ch nhiá»‡m:** Ká»¹ sÆ° benchmark/Ä‘Ã¡nh giÃ¡, Ká»¹ sÆ° kiá»ƒm thá»­ tá»± Ä‘á»™ng; phá»‘i há»£p nhÃ³m AI/ML vÃ  mÃ´ phá»ng.
- **Äáº§u vÃ o:** mÃ´ hÃ¬nh/ká»¹ nÄƒng tá»« WS2 vÃ  cÃ¡c scenario tá»« WS4.
- **Äáº§u ra:** bá»™ benchmark, ká»‹ch báº£n kiá»ƒm thá»­, mÃ£ tá»± Ä‘á»™ng, báº£ng success rate, lá»—i vÃ  bÃ¡o cÃ¡o so sÃ¡nh.
- **TiÃªu chÃ­ nghiá»‡m thu:** ká»‹ch báº£n cÃ³ Ä‘iá»u kiá»‡n vÃ  metrics Ä‘Æ°á»£c Ä‘á»‹nh nghÄ©a trÆ°á»›c; má»¥c tiÃªu láº·p tá»‘i thiá»ƒu **20 láº§n má»—i ká»‹ch báº£n** khi kháº£ thi; bÃ¡o cÃ¡o nÃªu rÃµ sá»‘ láº§n cháº¡y, tháº¥t báº¡i vÃ  giá»›i háº¡n. CÃ¡c ngÆ°á»¡ng nhÆ° success rate â‰¥90% cho tÃ¡i táº¡o hoáº·c >70% cho khÃ¡i quÃ¡t hÃ³a lÃ  **má»¥c tiÃªu Ä‘á» xuáº¥t cáº§n xÃ¡c nháº­n**, khÃ´ng pháº£i káº¿t quáº£ Ä‘Ã£ Ä‘áº¡t.
- **Effort:** **M**.
- **Phá»¥ thuá»™c:** WS4 vá» sandbox vÃ  WS2 vá» mÃ´ hÃ¬nh.
- **Rá»§i ro:** ká»‹ch báº£n khÃ´ng Ä‘á»§ Ä‘a dáº¡ng, metrics khÃ´ng pháº£n Ã¡nh Ä‘á»™ tin cáº­y, chÃªnh lá»‡ch giá»¯a mÃ´ phá»ng vÃ  thá»±c táº¿.

**HÆ°á»›ng dáº«n liÃªn quan:** [12 â€” Benchmark/Ä‘Ã¡nh giÃ¡](docs/roles/12-benchmark-danh-gia.md) Â· [13 â€” Kiá»ƒm thá»­ tá»± Ä‘á»™ng](docs/roles/13-kiem-thu-tu-dong.md)

### WS4 â€” MÃ´i trÆ°á»ng MÃ´ phá»ng vÃ  Digital Twin (Sandbox & Sim2Real)

**Má»¥c tiÃªu:** táº¡o sandbox cÃ³ thá»ƒ cáº¥u hÃ¬nh vÃ  sinh scenario Ä‘á»ƒ phÃ¡t triá»ƒn/Ä‘Ã¡nh giÃ¡ trÆ°á»›c khi cÃ³ robot tháº­t.

- **Nhiá»‡m vá»¥:** dá»±ng mÃ´ hÃ¬nh robot/Ä‘á»‘i tÆ°á»£ng, khá»›p vÃ  va cháº¡m trong simulator phÃ¹ há»£p vá»›i repo Jumper (xÃ¡c minh trÆ°á»›c khi chá»n MuJoCo/PyBullet). Táº¡o/reset scenario vá»›i vá»‹ trÃ­ ban Ä‘áº§u, váº­t cáº£n vÃ  tham sá»‘ váº­t lÃ½ thay Ä‘á»•i. NghiÃªn cá»©u Digital Twin/Real-is-Sim, Gaussian Splatting hoáº·c Position-Based Dynamics nhÆ° cÃ¡c háº¡ng má»¥c nÃ¢ng cao, khÃ´ng máº·c Ä‘á»‹nh lÃ  tÃ­nh nÄƒng Ä‘Ã£ sáºµn sÃ ng.
- **Vai trÃ² chá»‹u trÃ¡ch nhiá»‡m:** Ká»¹ sÆ° mÃ´ phá»ng/sandbox, Ká»¹ sÆ° táº¡o mÃ´i trÆ°á»ng/randomization, Ká»¹ sÆ° Robotics, NhÃ  khoa há»c Robotics.
- **Äáº§u vÃ o:** mÃ´ hÃ¬nh/thÃ´ng sá»‘ robot, Ä‘á»‘i tÆ°á»£ng vÃ  dá»¯ liá»‡u phÃ¹ há»£p tá»« WS1; yÃªu cáº§u kiá»ƒm thá»­ tá»« WS3.
- **Äáº§u ra:** sandbox cÃ³ cáº¥u hÃ¬nh, scene descriptor/API, scenario generator, hÆ°á»›ng dáº«n sá»­ dá»¥ng vÃ  bÃ¡o cÃ¡o á»•n Ä‘á»‹nh/giá»›i háº¡n.
- **TiÃªu chÃ­ nghiá»‡m thu:** cháº¡y á»•n Ä‘á»‹nh má»™t sá»‘ ká»‹ch báº£n máº«u; reset vÃ  tham sá»‘ scenario cÃ³ thá»ƒ kiá»ƒm soÃ¡t; cÃ³ test vÃ  tÃ i liá»‡u tÃ¡i láº­p. Chá»‰ Ä‘Ã¡nh giÃ¡ sai lá»‡ch mÃ´ phá»ngâ€“tháº­t khi Ä‘Ã£ cÃ³ dá»¯ liá»‡u hoáº·c robot tháº­t Ä‘á»ƒ Ä‘á»‘i chiáº¿u.
- **Effort:** **L**.
- **Phá»¥ thuá»™c:** thÃ´ng sá»‘/mÃ´ hÃ¬nh robot vÃ  yÃªu cáº§u tá»« WS1â€“WS3; má»™t sá»‘ kiá»ƒm chá»©ng cáº§n pháº§n cá»©ng.
- **Rá»§i ro:** mÃ´ phá»ng sai ma sÃ¡t/va cháº¡m, mÃ´ hÃ¬nh khÃ´ng khá»›p robot tháº­t, tÃ­ch há»£p phá»©c táº¡p, hiá»‡u chá»‰nh cháº­m hoáº·c khÃ´ng á»•n Ä‘á»‹nh.

**HÆ°á»›ng dáº«n liÃªn quan:** [10 â€” Sandbox mÃ´ phá»ng](docs/roles/10-sandbox-mo-phong.md) Â· [11 â€” Táº¡o mÃ´i trÆ°á»ng/randomization](docs/roles/11-tao-moi-truong.md)

### WS5 â€” TÃ­ch há»£p, An toÃ n vÃ  Triá»ƒn khai (Integration & Deployment)

**Má»¥c tiÃªu:** Ä‘Ã³ng gÃ³i ká»¹ nÄƒng cÃ³ phiÃªn báº£n, kiá»ƒm thá»­ tá»± Ä‘á»™ng vÃ  chuáº©n bá»‹ quy trÃ¬nh tÃ­ch há»£p an toÃ n.

- **Nhiá»‡m vá»¥:** Ä‘á»‹nh nghÄ©a skill bundle chá»©a policy/checkpoint/metadata; quy Ä‘á»‹nh API vÃ  phiÃªn báº£n; xÃ¢y dá»±ng CI Ä‘á»ƒ cháº¡y kiá»ƒm tra tá»± Ä‘á»™ng; láº­p checklist an toÃ n, giá»›i háº¡n lá»±c/váº­n tá»‘c/vÃ¹ng hoáº¡t Ä‘á»™ng, Ä‘iá»u kiá»‡n dá»«ng vÃ  fail-safe. Khi cÃ³ robot, tÃ­ch há»£p driver/sensor vÃ  thá»±c hiá»‡n kiá»ƒm thá»­ thá»±c táº¿ theo quy trÃ¬nh Ä‘Æ°á»£c phÃª duyá»‡t.
- **Vai trÃ² chá»‹u trÃ¡ch nhiá»‡m:** Ká»¹ sÆ° Ä‘Ã³ng gÃ³i ká»¹ nÄƒng vÃ  CI, Ká»¹ sÆ° tÃ­ch há»£p pháº§n cá»©ng/an toÃ n, Äiá»u phá»‘i dá»± Ã¡n/Kiáº¿n trÃºc há»‡ thá»‘ng.
- **Äáº§u vÃ o:** mÃ´ hÃ¬nh WS2, sandbox vÃ  scenario WS4, káº¿t quáº£ benchmark WS3, dá»¯ liá»‡u/quy trÃ¬nh WS1.
- **Äáº§u ra:** skill bundle cÃ³ phiÃªn báº£n, pipeline CI, hÆ°á»›ng dáº«n triá»ƒn khai, checklist an toÃ n, bÃ¡o cÃ¡o kiá»ƒm thá»­ tÃ­ch há»£p.
- **TiÃªu chÃ­ nghiá»‡m thu:** CI cÃ³ kiá»ƒm tra tá»± Ä‘á»™ng; artefact cÃ³ version vÃ  hÆ°á»›ng dáº«n tÃ¡i láº­p; ká»¹ nÄƒng chá»‰ Ä‘Æ°á»£c Ä‘Æ°a lÃªn robot khi Ä‘áº¡t Ä‘iá»u kiá»‡n an toÃ n Ä‘Ã£ xÃ¡c Ä‘á»‹nh vÃ  Ä‘Æ°á»£c kiá»ƒm tra trÃªn pháº§n cá»©ng má»¥c tiÃªu.
- **Effort:** **M**.
- **Phá»¥ thuá»™c:** Ä‘áº§u ra WS1â€“WS4; kiá»ƒm thá»­ driver/sensor vÃ  Sim-to-Real thá»±c táº¿ phá»¥ thuá»™c robot tháº­t.
- **Rá»§i ro:** bá» sÃ³t tÃ¬nh huá»‘ng an toÃ n, lá»—i tÆ°Æ¡ng thÃ­ch driver/sensor, artefact khÃ´ng tÆ°Æ¡ng thÃ­ch, quy trÃ¬nh triá»ƒn khai thiáº¿u kiá»ƒm soÃ¡t.

**HÆ°á»›ng dáº«n liÃªn quan:** [01 â€” Äiá»u phá»‘i/kiáº¿n trÃºc](docs/roles/01-dieu-phoi-kien-truc.md) Â· [14 â€” ÄÃ³ng gÃ³i ká»¹ nÄƒng vÃ  CI](docs/roles/14-dong-goi-skill-ci.md) Â· [15 â€” TÃ­ch há»£p pháº§n cá»©ng vÃ  an toÃ n](docs/roles/15-tich-hop-phan-cung-an-toan.md)

## 3. Danh sÃ¡ch Ä‘áº§y Ä‘á»§ 15 hÆ°á»›ng dáº«n vá»‹ trÃ­

| STT | Vá»‹ trÃ­ | Workstream | HÆ°á»›ng dáº«n |
|---:|---|---|---|
| 01 | Äiá»u phá»‘i dá»± Ã¡n / Kiáº¿n trÃºc há»‡ thá»‘ng | WS0 â€” Äiá»u phá»‘i | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/01-dieu-phoi-kien-truc.md) |
| 02 | Ká»¹ sÆ° thu tháº­p dá»¯ liá»‡u | WS1 â€” Dá»¯ liá»‡u | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/02-thu-thap-du-lieu.md) |
| 03 | Ká»¹ sÆ° xá»­ lÃ½ dá»¯ liá»‡u | WS1 â€” Dá»¯ liá»‡u | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/03-xu-ly-du-lieu.md) |
| 04 | ChuyÃªn gia ká»¹ nÄƒng / tri thá»©c chuyÃªn gia | WS1 â€” Dá»¯ liá»‡u | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/04-chuyen-gia-ky-nang.md) |
| 05 | Ká»¹ sÆ° dá»¯ liá»‡u / quáº£n lÃ½ tri thá»©c | WS1 â€” Dá»¯ liá»‡u | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/05-quan-ly-tri-thuc.md) |
| 06 | Ká»¹ sÆ° AI/ML â€” baseline | WS2 â€” AI/ML | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/06-baseline-ai-ml.md) |
| 07 | Ká»¹ sÆ° há»c báº¯t chÆ°á»›c | WS2 â€” AI/ML | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/07-hoc-bat-chuoc.md) |
| 08 | Ká»¹ sÆ° há»c tÄƒng cÆ°á»ng / huáº¥n luyá»‡n | WS2 â€” AI/ML | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/08-hoc-tang-cuong.md) |
| 09 | Ká»¹ sÆ° Ä‘iá»u khiá»ƒn robot | WS2 â€” AI/ML | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/09-dieu-khien-robot.md) |
| 10 | Ká»¹ sÆ° mÃ´ phá»ng / sandbox | WS4 â€” MÃ´ phá»ng | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/10-sandbox-mo-phong.md) |
| 11 | Ká»¹ sÆ° táº¡o mÃ´i trÆ°á»ng / randomization | WS4 â€” MÃ´ phá»ng | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/11-tao-moi-truong.md) |
| 12 | Ká»¹ sÆ° benchmark / Ä‘Ã¡nh giÃ¡ | WS3 â€” ÄÃ¡nh giÃ¡ | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/12-benchmark-danh-gia.md) |
| 13 | Ká»¹ sÆ° kiá»ƒm thá»­ tá»± Ä‘á»™ng | WS3 â€” ÄÃ¡nh giÃ¡ | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/13-kiem-thu-tu-dong.md) |
| 14 | Ká»¹ sÆ° Ä‘Ã³ng gÃ³i ká»¹ nÄƒng vÃ  CI | WS5 â€” TÃ­ch há»£p | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/14-dong-goi-skill-ci.md) |
| 15 | Ká»¹ sÆ° tÃ­ch há»£p pháº§n cá»©ng vÃ  an toÃ n | WS5 â€” TÃ­ch há»£p | [Má»Ÿ hÆ°á»›ng dáº«n](docs/roles/15-tich-hop-phan-cung-an-toan.md) |

## 4. Quy táº¯c lÃ m viá»‡c chung

- KhÃ´ng ghi lÃ  hoÃ n thÃ nh náº¿u chÆ°a cháº¡y hoáº·c chÆ°a kiá»ƒm tra Ä‘Æ°á»£c.
- KhÃ´ng giáº£ Ä‘á»‹nh tÃ­nh nÄƒng cÃ³ sáºµn trong Jumper; xÃ¡c minh repo vÃ  tÃ i liá»‡u thá»±c táº¿.
- Video quan sÃ¡t khÃ´ng tá»± Ä‘á»™ng chá»©a lá»‡nh Ä‘iá»u khiá»ƒn, mÃ´-men xoáº¯n hay tráº¡ng thÃ¡i cáº£m biáº¿n.
- Viá»‡c cáº§n robot tháº­t pháº£i Ä‘Ã¡nh dáº¥u **chá» pháº§n cá»©ng**; khÃ´ng thay kiá»ƒm thá»­ thá»±c táº¿ báº±ng mÃ´ phá»ng.
- Má»—i thay Ä‘á»•i cáº§n cÃ³ mÃ´ táº£, cÃ¡ch kiá»ƒm tra vÃ  báº±ng chá»©ng. KhÃ´ng commit API key, máº­t kháº©u hoáº·c dá»¯ liá»‡u riÃªng tÆ°.
- CÃ¡c hÆ°á»›ng nghiÃªn cá»©u nÃ¢ng cao nhÆ° IRL, GAN, Gaussian Splatting vÃ  Real-is-Sim cáº§n Ä‘Æ°á»£c chia thÃ nh thá»­ nghiá»‡m nhá»; khÃ´ng xem lÃ  háº¡ng má»¥c Ä‘Ã£ triá»ƒn khai sáºµn.
