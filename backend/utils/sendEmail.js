import React from "react";
import nodemailer from "nodemailer";

const sendEmail = async (toEmail, order) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vodaiminhtri@gmail.com",
      pass: "ziqiuwkufvzgltel",
    },
  });
  const html = `
  <div style="font-family: 'Georgia', serif; background:#f5f5f5; padding:30px">

    <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border:1px solid #ddd;">
      
      <!-- HEADER -->
      <h1 style="text-align:center; letter-spacing:3px; color:#111;">
        VINTAGE WATCH
      </h1>
      <p style="text-align:center; font-size:12px; color:#777;">
        Timeless Elegance
      </p>

      <hr style="margin:25px 0; border:none; border-top:1px solid #ddd;" />

      <!-- TITLE -->
      <h2 style="text-align:center; color:#000;">
        Đặt hàng thành công
      </h2>
      <p style="text-align:center; color:#555;">
        Xin cảm ơn ${order.shippingAddress.firstName} đã tin tưởng chúng tôi
      </p>

      <!-- ORDER -->
      <h3 style="margin-top:30px; color:#000;">Chi tiết đơn hàng</h3>

      <table style="width:100%; border-collapse: collapse; margin-top:10px;">
        <thead>
          <tr style="border-bottom:2px solid #000;">
            <th style="text-align:left; padding:8px;">Sản phẩm</th>
            <th style="text-align:center; padding:8px;">SL</th>
            <th style="text-align:right; padding:8px;">Giá</th>
          </tr>
        </thead>
        <tbody>
          ${order.orderItems
            .map(
              (item) => `
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:10px;">${item.name}</td>
                <td style="text-align:center;">${item.qty}</td>
                <td style="text-align:right;">${item.price.toLocaleString()} $</td>
              </tr>
            `,
            )
            .join("")}
        </tbody>
      </table>

      <!-- TOTAL -->
      <div style="margin-top:20px; text-align:right;">
        <h3 style="color:#000;">
          Tổng: ${order.totalPrice.toLocaleString()} $
        </h3>
      </div>

      <hr style="margin:25px 0; border:none; border-top:1px solid #ddd;" />

      <!-- SHIPPING -->
      <h4 style="color:#000;">Thông tin giao hàng</h4>
      <p style="color:#555; line-height:1.6;">
        ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br/>
        ${order.shippingAddress.address}, ${order.shippingAddress.city}<br/>
        ${order.shippingAddress.phone}
      </p>

      <!-- FOOTER -->
      <p style="margin-top:30px; font-size:13px; color:#777;">
        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
      </p>

      <p style="text-align:center; margin-top:40px; font-size:11px; color:#aaa;">
        © Vintage Watch Store
      </p>

    </div>
  </div>
`;

  await transpoter.sendMail({
    from: "Shop Vintage",
    to: toEmail,
    subject: "xác nhận đơn hàng",
    html,
  });
};

export default sendEmail;
