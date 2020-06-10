import RootNavigation from '../screens/RootNavigation';
import VXRNotificationCategoryId from '../constants/VXRNotificationCategoryId';
import VXRGlobal from '../globals/VXRGlobal';
import JsonUtil from '../utils/JsonUtil';

export default class VXRNotificationHandler {

    static onReceived(action, notification) {

    }

    static onClick(action, data) {
        if (data) {
            if (!VXRGlobal.appInitialize || !RootNavigation.isAvailable()) {
                VXRGlobal.appNotification = data;
            } else {
                switch (Number(data?.categoryId)) {
                    case VXRNotificationCategoryId.NOTIFICATION_INFORMATION:
                        RootNavigation.push('NotificationDetail', {defaultParam: JsonUtil.buildDefaultParam({notification: data})});
                        break;
                    case VXRNotificationCategoryId.NOTIFICATION_WEB:
                        RootNavigation.navigate('Web', {
                            defaultParam: JsonUtil.buildDefaultParam({
                                uri: data?.data?.url
                            })
                        });
                        break;
                    default:
                        RootNavigation.push('NotificationDetail', {defaultParam: JsonUtil.buildDefaultParam({notification: data})});
                        break;
                }

                // Update read notification with API
            }
        }
    }
}
