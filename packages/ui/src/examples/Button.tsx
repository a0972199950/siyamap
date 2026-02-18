import Button from '../components/Button';
import Icon from '../components/Icon';
import {
  faDownload,
  faShare,
  faSpinner,
  faPlus,
  faMinus,
  faEdit,
  faTrash,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

/**
 * Button 組件使用範例
 * 展示如何在專案中使用 Button 組件的各種功能
 */
export default function ButtonExample() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Button 組件範例</h2>
        <p className="text-gray-600 mb-6">
          展示 Button 組件的各種使用方式，包括類型、大小、顏色和圓角設定
        </p>
      </div>

      {/* 基本使用 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">基本使用</h3>
        <div className="flex items-center gap-4">
          <Button>預設按鈕</Button>
          <Button type="secondary">次要按鈕</Button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          type: primary | secondary
        </div>
      </section>

      {/* 不同大小 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">不同大小</h3>
        <div className="flex items-center gap-4">
          <Button size="sm">小按鈕</Button>
          <Button size="md">中按鈕</Button>
          <Button size="lg">大按鈕</Button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          size: sm | md | lg
        </div>
      </section>

      {/* 專案色彩系統 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">專案色彩系統</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary-500">主色 500</Button>
          <Button color="primary-400">主色 400</Button>
          <Button color="secondary-500">次色 500</Button>
          <Button color="secondary-400">次色 400</Button>
          <Button color="red">紅色</Button>
          <Button color="green">綠色</Button>
          <Button color="blue">藍色</Button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          color: primary-500 | primary-400 | secondary-500 | secondary-400 | secondary-300 | red | green | blue
        </div>
      </section>

      {/* 圓角設定 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">圓角設定</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button rounded="none">無圓角</Button>
          <Button rounded="sm">小圓角</Button>
          <Button rounded="md">中圓角</Button>
          <Button rounded="lg">大圓角</Button>
          <Button rounded="full">完全圓角</Button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          rounded: none | sm | md | lg | full
        </div>
      </section>

      {/* 組合變化 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">組合變化</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-md font-medium mb-2">主要按鈕</h4>
            <div className="space-y-2">
              <Button type="primary" size="sm" rounded="full">小型圓形</Button>
              <Button type="primary" size="md" rounded="lg" color="blue">中型藍色</Button>
              <Button type="primary" size="lg" rounded="md" color="green">大型綠色</Button>
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium mb-2">次要按鈕</h4>
            <div className="space-y-2">
              <Button type="secondary" size="sm" rounded="sm">小型次要</Button>
              <Button type="secondary" size="md" rounded="md" color="red">中型紅色</Button>
              <Button type="secondary" size="lg" rounded="lg">大型次要</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 帶圖標按鈕 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">帶圖標按鈕</h3>

        {/* 基本圖標按鈕 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">基本圖標按鈕</h4>
          <div className="flex flex-wrap gap-4">
            <Button type="primary" size="md" rounded="md">
              <Icon icon={faDownload} size="sm" className="mr-2" />
              下載
            </Button>
            <Button type="primary" size="md" rounded="md" color="green">
              <Icon icon={faShare} size="sm" className="mr-2" />
              分享
            </Button>
            <Button type="secondary" size="md" rounded="md">
              <Icon icon={faEdit} size="sm" className="mr-2" />
              編輯
            </Button>
            <Button type="secondary" size="md" rounded="md" color="red">
              <Icon icon={faTrash} size="sm" className="mr-2" />
              刪除
            </Button>
          </div>
        </div>

        {/* 只有圖標按鈕 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">圖標按鈕</h4>
          <div className="flex flex-wrap gap-4">
            <Button type="primary" size="sm" rounded="full" color="blue">
              <Icon icon={faPlus} size="xs" />
            </Button>
            <Button type="primary" size="md" rounded="full" color="green">
              <Icon icon={faCheck} size="sm" />
            </Button>
            <Button type="secondary" size="md" rounded="full">
              <Icon icon={faMinus} size="sm" />
            </Button>
            <Button type="secondary" size="lg" rounded="full" color="red">
              <Icon icon={faTimes} size="md" />
            </Button>
          </div>
        </div>

        {/* 載入狀態 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">載入狀態</h4>
          <div className="flex flex-wrap gap-4">
            <Button type="primary" size="md" rounded="md">
              <Icon icon={faSpinner} animation="spin" size="sm" className="mr-2" />
              處理中...
            </Button>
            <Button type="secondary" size="md" rounded="md">
              <Icon icon={faSpinner} animation="spinPulse" size="sm" className="mr-2" />
              載入中...
            </Button>
          </div>
        </div>
      </section>

      {/* 實際應用場景 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">實際應用場景</h3>

        {/* 表單操作 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">表單操作</h4>
          <div className="flex gap-4">
            <Button type="primary" size="md" rounded="md" color="blue">
              確認保存
            </Button>
            <Button type="secondary" size="md" rounded="md">
              取消
            </Button>
            <Button type="secondary" size="md" rounded="md" color="primary-400">
              重設
            </Button>
          </div>
        </div>

        {/* 狀態按鈕 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">狀態按鈕</h4>
          <div className="flex gap-4">
            <Button type="primary" size="sm" rounded="full" color="green">
              <Icon icon={faCheck} size="xs" className="mr-1" />
              通過
            </Button>
            <Button type="primary" size="sm" rounded="full" color="red">
              <Icon icon={faTimes} size="xs" className="mr-1" />
              拒絕
            </Button>
            <Button type="secondary" size="sm" rounded="full">
              <Icon icon={faSpinner} animation="spin" size="xs" className="mr-1" />
              審梥中
            </Button>
          </div>
        </div>

        {/* 尺寸組合 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">尺寸組合</h4>
          <div className="flex items-center gap-2">
            <Button type="primary" size="lg" rounded="lg" color="blue">
              主要行動
            </Button>
            <Button type="secondary" size="md" rounded="md">
              次要行動
            </Button>
            <Button type="secondary" size="sm" rounded="sm">
              輔助行動
            </Button>
          </div>
        </div>
      </section>

      {/* 程式碼範例 */}
      <section>
        <h3 className="text-lg font-semibold mb-3">使用方式</h3>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-gray-800 overflow-x-auto">
{`import { Button, Icon, faDownload } from '@siyamap/ui';

// 基本使用
<Button>預設按鈕</Button>
<Button type="secondary">次要按鈕</Button>

// 自訂尺寸和圓角
<Button size="lg" rounded="full">大型圓形按鈕</Button>

// 使用專案色彩
<Button color="blue">藍色按鈕</Button>

// 帶圖標按鈕
<Button>
  <Icon icon={faDownload} size="sm" className="mr-2" />
  下載
</Button>

// 組合變化
<Button
  type="primary"
  size="md"
  rounded="lg"
  color="green"
>
  完成
</Button>`}
          </pre>
        </div>
      </section>
    </div>
  );
}
