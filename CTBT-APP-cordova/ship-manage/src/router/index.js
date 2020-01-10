import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import ShipMian from '@/components/ShipMian'
import system from '@/components/System/system'
import Password from '@/components/System/Password'
import Sound from '@/components/System/Sound'
//import Test_distance from '@/components/Manage/Test_distance'
import MyShips from '@/components/ShipManage/MyShips'
import Search from '@/components/ShipManage/Search'
import NoPowerSearch from '@/components/ShipManage/NoPowerSearch'
import ShipTrace from '@/components/ShipManage/ShipTrace'
import GroupManage from '@/components/ShipManage/GroupManage'
import AlarmSearch from '@/components/Alarm/AlarmSearch'
import PortSearch from '@/components/Alarm/Portsearch'
import Rescue from '@/components/Alarm/Rescue'
import ExactAdd from '@/components/WarnRegion/ExactAdd'
import Seewarn from '@/components/WarnRegion/Seewarn'
import Searchdata from '@/components/Searchcount/Searchdata'
import Sailcount from '@/components/Searchcount/Sailcount'
import olmap from '@/components/MapManage/olmap'
import olmapApp from '@/components/MapManage/olmapApp'
import TheLogin from '@/components/views/TheLogin'
import AlarmShips from "../components/Alarm/AlarmShips";
import NoPowerShips from "../components/ShipManage/NoPowerShips";
import olmapForTrace from "@/components/MapManage/olmapForTrace";

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'TheLogin',
      component: TheLogin,
    },
    {
      path: '/ShipMian',
      name: 'ShipMian',
      component: ShipMian,
      children:[
        {
          path: '/System/system',
          name: 'system',
          component: system,
        },
        {
          path: '/System/Password',
          name: 'Password',
          component: Password,
        },
        {
          path: '/System/Sound',
          name: 'Sound',
          component: Sound,
        },
        {
          path: '/MapManage/olmap',
          name: 'olmap',
          component: olmap,
        },
        {
          path: '/MapManage/olmapApp',
          name: 'olmapApp',
          component: olmapApp,
        },
        {
          path: '/MapManage/olmapForTrace',
          name: 'olmapForTrace',
          component: olmapForTrace,
        },
        {
          path: '/ShipManage/MyShips',
          name: 'MyShips',
          component: MyShips,
        },
        {
          path: '/ShipManage/Search',
          name: 'Search',
          component: Search,
        },
        {
          path: '/ShipManage/NoPowerShips',
          name: 'NoPowerShips',
          component: NoPowerShips,
        },
        {
          path: '/ShipManage/NoPowerSearch',
          name: 'NoPowerSearch',
          component: NoPowerSearch,
        },
        {
          path: '/ShipManage/ShipTrace',
          name: 'ShipTrace',
          component: ShipTrace,
        },
        {
          path: '/ShipManage/GroupManage',
          name: 'GroupManage',
          component: GroupManage,
        },
        {
          path: '/Alarm/AlarmShips',
          name: 'AlarmShips',
          component: AlarmShips,
        },
        {
          path: '/Alarm/AlarmSearch',
          name: 'AlarmSearch',
          component: AlarmSearch,
        },
        {
          path: '/Alarm/PortSearch',
          name: 'PortSearch',
          component: PortSearch,
        },
        {
          path: '/Alarm/Rescue',
          name: 'Rescue',
          component: Rescue,
        },
        {
          path: '/WarnRegion/ExactAdd',
          name: 'ExactAdd',
          component: ExactAdd,
        },
        {
          path: '/WarnRegion/Seewarn',
          name: 'Seewarn',
          component: Seewarn,
        },
        {
          path: '/Searchcount/Searchdata',
          name: 'Searchdata',
          component: Searchdata,
        },
        {
          path: '/Searchcount/Sailcount',
          name: 'Sailcount',
          component: Sailcount,
        }
      ]
    }
  ]
})
