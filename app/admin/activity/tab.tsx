import { useTransactionStore } from '@/stores/transactionStore';
import { FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminActivityTab() {
  const { getActivities } = useTransactionStore();
  const activities = getActivities();

  const getActivityIcon = (type: string, action: string) => {
    switch (type) {
      case 'product':
        if (action.includes('Created')) return 'add-circle';
        if (action.includes('Deleted')) return 'trash';
        return 'pencil';
      case 'user':
        if (action.includes('Created')) return 'person-add';
        if (action.includes('Deleted')) return 'person-remove';
        return 'person';
      case 'stock':
        if (action.includes('Increased')) return 'arrow-up-circle';
        if (action.includes('Decreased')) return 'arrow-down-circle';
        return 'layers';
      default:
        return 'document-text';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'product':
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: '#ea580c' };
      case 'user':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: '#2563eb' };
      case 'stock':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: '#16a34a' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: '#6b7280' };
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-2xl font-bold text-gray-900">Activity Log</Text>
          <Text className="text-sm text-gray-500">{activities.length} events</Text>
        </View>
        <Text className="text-sm text-gray-600">Track all admin actions and system changes</Text>
      </View>

      {/* Activity List */}
      {activities.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="document-text" size={48} color="#d1d5db" />
          <Text className="text-gray-400 text-base mt-3">No activity yet</Text>
          <Text className="text-gray-400 text-sm mt-1">Admin actions will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const colors = getActivityColor(item.type);
            const iconName = getActivityIcon(item.type, item.action);
            return (
              <View className={`rounded-lg p-4 mb-3 border ${colors.bg} ${colors.border} shadow-sm`}>
                {/* Activity Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-start flex-1">
                    {/* Icon Circle */}
                    <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${colors.bg} border ${colors.border}`}>
                      <Ionicons name={iconName} size={20} color={colors.icon} />
                    </View>
                    
                    {/* Content */}
                    <View className="flex-1">
                      <Text className={`text-base font-bold ${colors.text}`}>{item.action}</Text>
                      <Text className="text-sm text-gray-600 mt-1">{item.details}</Text>
                    </View>
                  </View>

                  {/* Type Badge */}
                  <View className={`rounded-full px-2.5 py-1 ml-2 ${colors.bg} border ${colors.border}`}>
                    <Text className={`text-xs font-semibold ${colors.text} capitalize`}>
                      {item.type}
                    </Text>
                  </View>
                </View>

                {/* Timestamp */}
                <View className="flex-row items-center gap-1 border-t border-gray-200 pt-2">
                  <Ionicons name="time" size={14} color="#9ca3af" />
                  <Text className="text-xs text-gray-500">{formatTime(item.timestamp)}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
