import { View, Text, FlatList } from 'react-native';
import { useTransactionStore } from '@/stores/transactionStore';

export default function AdminActivityTab() {
  const { getActivities } = useTransactionStore();
  const activities = getActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'product':
        return '📦';
      case 'user':
        return '👥';
      case 'stock':
        return '📊';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-orange-100 border-orange-300';
      case 'user':
        return 'bg-blue-100 border-blue-300';
      case 'stock':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-gray-100 border-gray-300';
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
    <View className="flex-1 bg-gray-50">
      {activities.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">No activity yet</Text>
        </View>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <View className={`rounded-lg p-4 mb-3 border ${getActivityColor(item.type)}`}>
              {/* Header */}
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="text-lg">{getActivityIcon(item.type)}</Text>
                    <Text className="text-lg font-bold text-gray-800">{item.action}</Text>
                  </View>
                  <Text className="text-sm text-gray-700">{item.details}</Text>
                </View>
              </View>

              {/* Timestamp */}
              <Text className="text-xs text-gray-600">{formatTime(item.timestamp)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
