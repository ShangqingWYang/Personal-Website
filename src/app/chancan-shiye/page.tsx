'use client';

import React from 'react';
import { motion } from 'framer-motion';
import '@fontsource/noto-serif-sc/400.css'; // Regular
import '@fontsource/noto-serif-sc/700.css'; // Bold

export default function ChancanShiyePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Page title */}
      <motion.h1
        className="text-5xl md:text-7xl font-noto-serif-sc font-bold mb-8 text-[#c41f4f]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 150 }}
      >
        春蚕食叶
      </motion.h1>

      {/* Epic refined classical poem */}
      <motion.div
        className="text-lg md:text-2xl font-noto-serif-sc leading-relaxed max-w-3xl text-[#c41f4f] space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <p>微风拂过桃花岸，红影点点如梦卷，</p>
        <p>夜露轻润丝竹声，半帘幽香入我眠。</p>
        <p>细雨浸透青衫袖，浅笑低吟未敢言，</p>
        <p>春水涟漪映朱颜，情意绵绵似锦延。</p>
        <p>月光如练洒庭院，轻叩花影舞翩跹，</p>
        <p>魂梦随风飘百里，红尘深处皆柔软。</p>
        <p>若问此心何所寄，唯愿花间共幽欢，</p>
        <p>轻纱薄雾托香气，蝶舞蜂喧绕指间。</p>
        <p>流云掠影拂发梢，缠绵此景不忍散，</p>
        <p>宛若人间桃源里，春色柔情共婵娟。</p>
        <p>琼楼玉宇隐烟霞，玉露花魂共徘徊，</p>
        <p>香径幽幽承夜雨，暗香浮动入衣怀。</p>
        <p>轻舟荡漾柳影下，水光潋滟映红苔，</p>
        <p>心随幽梦穿青冥，指尖流光似蝶来。</p>
        <p>锦瑟无端怨流年，朱颜暗香共月斜，</p>
        <p>芳菲落尽春未老，幽情难寄水云涯。</p>
        <p>长夜微凉灯影摇，轻叹低吟思若海，</p>
        <p>红尘滚滚人间梦，唯愿此景化烟霭。</p>
        <p>柔风拂面香盈袖，纤手轻触心已开，</p>
        <p>千般缱绻情未了，花间醉舞到天明。</p>
      </motion.div>
    </div>
  );
}
