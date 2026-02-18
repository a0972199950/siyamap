import React from 'react';
import Icon from '../components/Icon';
import {
  faHome,
  faUser,
  faSearch,
  faHeart,
  faStar,
  faSpinner,
  faDownload,
  faShare,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

/**
 * Icon 組件使用範例
 * 展示如何在專案中使用 Icon 組件的各種功能
 */
export default function IconExample() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Icon 組件範例</h2>
        <p className="text-gray-600 mb-6">
          展示 Icon 組件的各種使用方式，包括大小、顏色、動畫和變形效果
        </p>
      </div>

      {/* 基本使用 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">基本使用</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faHome} />
          <Icon icon={faUser} />
          <Icon icon={faSearch} />
          <Icon icon={faHeart} />
          <Icon icon={faStar} />
        </div>
      </section>

      {/* 不同大小 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">不同大小</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faHome} size="xs" />
          <Icon icon={faHome} size="sm" />
          <Icon icon={faHome} size="md" />
          <Icon icon={faHome} size="lg" />
          <Icon icon={faHome} size="xl" />
          <Icon icon={faHome} size="2xl" />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          size: xs | sm | md | lg | xl | 2xl
        </div>
      </section>

      {/* 內建顏色類型 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">內建顏色類型</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faHeart} type="default" />
          <Icon icon={faHeart} type="primary" />
          <Icon icon={faHeart} type="secondary" />
          <Icon icon={faHeart} type="success" />
          <Icon icon={faHeart} type="warning" />
          <Icon icon={faHeart} type="danger" />
          <Icon icon={faHeart} type="muted" />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          type: default | primary | secondary | success | warning | danger | muted | white
        </div>
      </section>

      {/* 專案色彩系統 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">專案色彩系統</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faHeart} color="red" />
          <Icon icon={faHeart} color="green" />
          <Icon icon={faHeart} color="blue" />
          <Icon icon={faHeart} color="primary-500" />
          <Icon icon={faHeart} color="secondary-500" />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          color: primary-500 | primary-400 | secondary-500 | secondary-400 | secondary-300 | red | green | blue
        </div>
      </section>

      {/* 動畫效果 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">動畫效果</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <Icon icon={faSpinner} animation="spin" size="lg" />
            <div className="mt-2 text-sm text-gray-600">spin</div>
          </div>
          <div className="text-center">
            <Icon icon={faSpinner} animation="spinPulse" size="lg" />
            <div className="mt-2 text-sm text-gray-600">spinPulse</div>
          </div>
          <div className="text-center">
            <Icon icon={faHeart} animation="beat" size="lg" type="danger" />
            <div className="mt-2 text-sm text-gray-600">beat</div>
          </div>
          <div className="text-center">
            <Icon icon={faHeart} animation="fade" size="lg" type="primary" />
            <div className="mt-2 text-sm text-gray-600">fade</div>
          </div>
          <div className="text-center">
            <Icon icon={faStar} animation="bounce" size="lg" type="warning" />
            <div className="mt-2 text-sm text-gray-600">bounce</div>
          </div>
          <div className="text-center">
            <Icon icon={faHome} animation="shake" size="lg" />
            <div className="mt-2 text-sm text-gray-600">shake</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          animation: spin | spinPulse | spinReverse | pulse | beat | fade | beatFade | bounce | shake
        </div>
      </section>

      {/* 翻轉和旋轉 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">翻轉和旋轉</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <Icon icon={faUser} size="lg" />
            <div className="mt-2 text-sm text-gray-600">正常</div>
          </div>
          <div className="text-center">
            <Icon icon={faUser} flip="horizontal" size="lg" />
            <div className="mt-2 text-sm text-gray-600">水平翻轉</div>
          </div>
          <div className="text-center">
            <Icon icon={faUser} rotation={90} size="lg" />
            <div className="mt-2 text-sm text-gray-600">旋轉90°</div>
          </div>
          <div className="text-center">
            <Icon icon={faUser} rotation={180} size="lg" />
            <div className="mt-2 text-sm text-gray-600">旋轉180°</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          flip: horizontal | vertical | both<br />
          rotation: 90 | 180 | 270
        </div>
      </section>

      {/* 品牌圖標 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">品牌圖標</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faGithub} size="lg" />
          <Icon icon={faTwitter} size="lg" type="primary" />
        </div>
      </section>

      {/* 實際應用場景 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">實際應用場景</h3>
        
        {/* 按鈕 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">按鈕中使用</h4>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Icon icon={faDownload} size="sm" />
              下載
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              <Icon icon={faShare} size="sm" />
              分享
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              <Icon icon={faSpinner} animation="spin" size="sm" />
              載入中...
            </button>
          </div>
        </div>

        {/* 狀態指示 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">狀態指示</h4>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Icon icon={faCheck} type="success" />
              <span>成功</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon={faTimes} type="danger" />
              <span>錯誤</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon={faSpinner} animation="spin" />
              <span>處理中</span>
            </div>
          </div>
        </div>
      </section>

      {/* 程式碼範例 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">使用方式</h3>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-gray-800 overflow-x-auto">
{`import { Icon, faHome, faUser, faSpinner } from '@siyamap/ui';

// 基本使用
<Icon icon={faHome} />

// 自訂大小和內建顏色
<Icon icon={faUser} size="lg" type="primary" />

// 使用專案色彩系統
<Icon icon={faUser} color="primary-500" />

// 動畫效果
<Icon icon={faSpinner} animation="spin" />

// 翻轉和旋轉
<Icon icon={faUser} flip="horizontal" rotation={90} />

// 在按鈕中使用
<button>
  <Icon icon={faDownload} size="sm" />
  下載
</button>`}
          </pre>
        </div>
      </section>
    </div>
  );
}