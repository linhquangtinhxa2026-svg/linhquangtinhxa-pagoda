migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");

  const seeds = [
    {
      slug: "le-bo-nhiem-tru-tri-thich-minh-hue",
      category: "su-kien",
      title: "Lễ Trao Quyết Định Bổ Nhiệm Trụ Trì Tịnh Xá Linh Quang",
      description:
        "Sáng ngày 27/8, Ban Trị sự GHPGVN Quận 4 đã long trọng tổ chức lễ tiểu tường cố Trưởng lão Hòa thượng Thích Từ Giang và công bố quyết định bổ nhiệm Thượng tọa Thích Minh Huệ làm trụ trì Tịnh xá Linh Quang.",
      content:
        "<p>Sáng ngày 27/8, tại Tịnh xá Linh Quang (Quận 4, TP. Hồ Chí Minh), Ban Trị sự Giáo hội Phật giáo Việt Nam Quận 4 đã long trọng tổ chức lễ tiểu tường cố Trưởng lão Hòa thượng Thích Từ Giang, đồng thời công bố quyết định bổ nhiệm Thượng tọa Thích Minh Huệ giữ chức vụ trụ trì Tịnh xá Linh Quang.</p><p>Buổi lễ có sự tham dự của chư tôn đức Hòa thượng Thích Như Tín, Hòa thượng Thích Tịnh Hạnh cùng chư tôn đức Phó Ban Trị sự Phật giáo Thành phố, đại diện Ủy ban Mặt trận Tổ quốc, Ban Tôn giáo và Ủy ban Nhân dân Quận 4, cùng đông đảo chư tăng ni và Phật tử.</p><p>Cố Trưởng lão Hòa thượng Thích Từ Giang (thế danh Trương Văn Phát, 1943–2022) đã đảm nhiệm vai trò trụ trì Tịnh xá Linh Quang từ năm 1984, có nhiều đóng góp cho sự phát triển của Phật giáo và công tác từ thiện xã hội tại Quận 4.</p><p>Phát biểu tại buổi lễ, tân trụ trì Thượng tọa Thích Minh Huệ bày tỏ lòng tri ân sâu sắc trước sự tín nhiệm của Giáo hội và nguyện đem hết tâm sức để tiếp nối sự nghiệp hoằng pháp cũng như các hoạt động thiện nguyện mà cố Hòa thượng để lại.</p>",
      coverImageUrl: "/images/tin-tuc/le-bo-nhiem-tru-tri.jpg",
      date: "2022-08-27 00:00:00.000Z",
    },
    {
      slug: "le-huy-nhat-hoa-thuong-thich-tu-giang",
      category: "su-kien",
      title: "Lễ Húy Nhật Cố Trưởng Lão Hòa Thượng Thích Từ Giang",
      description:
        "Tịnh xá Linh Quang trang nghiêm tổ chức lễ húy nhật tưởng niệm cố Trưởng lão Hòa thượng Thích Từ Giang (1943–2022), vị trụ trì đã có nhiều đóng góp cho sự phát triển Phật giáo tại Quận 4.",
      content:
        "<p>Tịnh xá Linh Quang đã trang nghiêm tổ chức lễ húy nhật tưởng niệm cố Trưởng lão Hòa thượng Thích Từ Giang, vị trụ trì tiền nhiệm đã dành trọn cuộc đời cho sự nghiệp hoằng pháp và công tác thiện nguyện tại Quận 4 từ năm 1984 cho đến khi viên tịch năm 2022.</p><p>Trong không khí trang nghiêm, chư tăng ni bổn tự cùng Phật tử gần xa đã vân tập về chánh điện để dâng hương, tụng kinh cầu nguyện, ôn lại công hạnh và những đóng góp của cố Hòa thượng cho tịnh xá cũng như cộng đồng Phật tử địa phương.</p><p>Đây là dịp để tăng ni, Phật tử tưởng nhớ công đức của bậc tiền nhân, đồng thời nhắc nhở nhau tiếp nối tinh thần từ bi, phụng sự mà cố Hòa thượng đã gây dựng trong suốt gần bốn mươi năm trụ trì tịnh xá.</p>",
      coverImageUrl: "/images/tin-tuc/le-huy-nhat.jpg",
      date: "2024-09-05 00:00:00.000Z",
    },
    {
      slug: "phong-thuoc-nam-phuoc-thien-linh-quang",
      category: "hoat-dong",
      title: "Phòng Khám Y Học Dân Tộc Phước Thiện Linh Quang",
      description:
        "Hoạt động từ năm 1995, phòng khám y học dân tộc của tịnh xá tiếp tục khám, chẩn trị và cấp phát thuốc miễn phí cho bà con có hoàn cảnh khó khăn quanh khu vực Quận 4.",
      content:
        "<p>Phòng khám Y học dân tộc Phước Thiện Linh Quang được Tịnh xá Linh Quang thành lập từ năm 1995, với tâm nguyện đem y thuật cổ truyền hỗ trợ bà con lao động nghèo và người có hoàn cảnh khó khăn tại Quận 4 và các khu vực lân cận.</p><p>Phòng khám hoạt động dựa trên tinh thần từ bi và phước thiện, chuyên khám, chẩn trị và cấp phát thuốc nam miễn phí cho người bệnh, không phân biệt tôn giáo hay hoàn cảnh xuất thân.</p><p>Trải qua gần ba mươi năm hoạt động, phòng khám đã trở thành điểm tựa quen thuộc của nhiều gia đình lao động trong khu vực, góp phần chia sẻ gánh nặng chi phí y tế cho những người còn nhiều khó khăn trong cuộc sống.</p>",
      coverImageUrl: "/images/tin-tuc/phong-thuoc-nam.jpg",
      date: "2024-03-15 00:00:00.000Z",
    },
    {
      slug: "trung-tam-giao-duc-tre-khuyet-tat",
      category: "hoat-dong",
      title: "Trung Tâm Giáo Dục Trẻ Khuyết Tật Quận 4",
      description:
        "Được thành lập từ năm 1989 theo quyết định của UBND Quận 4, trung tâm tại 91 Nguyễn Khoái tiếp tục là mái nhà thứ hai giúp các em nhỏ khuyết tật hòa nhập cộng đồng.",
      content:
        "<p>Trung tâm Giáo dục trẻ khuyết tật Quận 4 được Tịnh xá Linh Quang thành lập theo Quyết định số 442/QĐ-UB ngày 02/6/1989 của Ủy ban Nhân dân Quận 4, đặt tại số 91 đường Nguyễn Khoái, Phường 1, Quận 4.</p><p>Trung tâm ra đời với mục tiêu tạo môi trường học tập và sinh hoạt phù hợp, giúp các em nhỏ khuyết tật có cơ hội tiếp cận giáo dục, rèn luyện kỹ năng sống và từng bước hòa nhập cộng đồng.</p><p>Trong suốt hơn ba mươi năm hoạt động, trung tâm luôn nhận được sự quan tâm, hỗ trợ của tăng ni, Phật tử và các mạnh thường quân gần xa, trở thành mái nhà thứ hai của nhiều thế hệ trẻ em kém may mắn tại Quận 4.</p>",
      coverImageUrl: "/images/tin-tuc/lop-hoc-tinh-thuong.jpg",
      date: "2024-01-20 00:00:00.000Z",
    },
    {
      slug: "le-tuong-niem-to-su-khai-son",
      category: "su-kien",
      title: "Lễ Tưởng Niệm Tổ Sư Khai Sơn Tịnh Xá",
      description:
        "Hằng năm vào ngày 16 tháng Giêng âm lịch, tịnh xá tổ chức lễ tưởng niệm công đức khai sơn của Hòa thượng Thích Phổ Ứng, người đã sáng lập tịnh xá từ năm 1953.",
      content:
        "<p>Hằng năm vào ngày 16 tháng Giêng âm lịch, Tịnh xá Linh Quang tổ chức lễ tưởng niệm công đức khai sơn của Hòa thượng Thích Phổ Ứng (Thích Nhuận Tắc) — vị tổ sư đã sáng lập tịnh xá từ năm 1953.</p><p>Buổi lễ là dịp để tăng ni, Phật tử bổn tự cùng nhau ôn lại hành trạng và công hạnh của tổ sư khai sơn, từ những ngày đầu lập tịnh thất đơn sơ cho đến khi tịnh xá được xây dựng khang trang như ngày nay.</p><p>Chương trình lễ thường bao gồm nghi thức dâng hương, tụng kinh cầu nguyện và thời pháp thoại nhắc nhở đại chúng về tinh thần tinh tấn tu học mà tổ sư đã truyền lại cho các thế hệ kế thừa.</p>",
      coverImageUrl: "/images/about/history-portrait.jpg",
      date: "2024-02-25 00:00:00.000Z",
    },
    {
      slug: "dai-le-vu-lan-bao-hieu",
      category: "thong-bao",
      title: "Đại Lễ Vu Lan Báo Hiếu",
      description:
        "Tịnh xá Linh Quang trân trọng thông báo chương trình Đại lễ Vu Lan Báo Hiếu, kính mời chư Phật tử gần xa cùng về tham dự, dâng hương tưởng nhớ công ơn sinh thành.",
      content:
        "<p>Nhân mùa Vu Lan báo hiếu, Tịnh xá Linh Quang trân trọng thông báo và kính mời chư Phật tử gần xa cùng về tham dự Đại lễ Vu Lan được tổ chức tại chánh điện tịnh xá.</p><p>Chương trình lễ dự kiến bao gồm nghi thức dâng hương tưởng niệm, tụng kinh Vu Lan báo hiếu, nghi thức cài hoa hồng và thời pháp thoại về đạo hiếu — đạo làm người trong tinh thần Phật giáo.</p><p>Đây là dịp để mỗi người con Phật lắng lòng tưởng nhớ công ơn sinh thành dưỡng dục của cha mẹ, đồng thời cùng nhau gieo trồng thêm phước lành trong mùa Vu Lan hiếu hạnh.</p>",
      coverImageUrl: "/images/visit/temple-lake.jpg",
      date: "2024-08-18 00:00:00.000Z",
    },
  ];

  for (const seed of seeds) {
    try {
      app.findFirstRecordByFilter("news", `slug="${seed.slug}"`);
    } catch {
      const category = app.findFirstRecordByFilter("news_categories", `value="${seed.category}"`);
      const record = new Record(collection);
      record.set("title", seed.title);
      record.set("slug", seed.slug);
      record.set("description", seed.description);
      record.set("content", seed.content);
      record.set("coverImageUrl", seed.coverImageUrl);
      record.set("gallery", []);
      record.set("category", category.id);
      record.set("isPublished", true);
      record.set("publishedAt", seed.date);
      app.save(record);
    }
  }
}, (app) => {
  console.log("Rollback: seed data not removed, clean up manually if needed");
});
