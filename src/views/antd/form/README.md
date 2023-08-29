# Antd-Form

### 使用方式

```vue
import { xx } from 'antd-form' /** html使用方式 */
<SelfForm
  ref="selfForm"
  :model="formState"
  :formItems="formItems"
  :label-col="{ span: 6 }"
  :wrapper-col="{ span: 18 }"
  @handleSearch="handleSearch"
  @handleReset="handleReset"
/>

formItems = [ { type: 'input', // 组件类型 sort: Number, // 排序，放在第几个位置
colConfig: { span: 6 }, // a-col配置 formItemConfig: { label: '名称', name:
'username' }, // a-form-item 配置 compConfig: { onPressEnter: myPressEnter } //
组件配置 } ] // 组件事件的传递，通过将事件传入组件配置里面 例如：compConfig: {
'antd文档的事件': '自定义的事件' } // 组件插槽的传递，也是如此 例如：compConfig:
{ suffix: h(MyComponent) }
```
