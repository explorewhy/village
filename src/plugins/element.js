import Vue from 'vue';
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Tooltip,
  Drawer,
  Table,
  TableColumn,
  Notification
} from 'element-ui';

Vue.prototype.$notify = Notification;
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Drawer);
Vue.use(Tooltip);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.prototype.$message = Message;
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Button);
