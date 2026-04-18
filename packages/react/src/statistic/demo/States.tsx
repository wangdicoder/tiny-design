import React from 'react';
import { Card, Flex, Statistic } from '@tiny-design/react';

export default function StatesDemo() {
  return (
    <Flex gap="md" wrap="wrap">
      <Card style={{ minWidth: 260, flex: '1 1 260px' }}>
        <Card.Content>
          <Statistic
            title="Net Retention"
            description="Syncing finance data from the billing warehouse."
            loading
            footer="Loading has the highest display priority."
          />
        </Card.Content>
      </Card>
      <Card style={{ minWidth: 260, flex: '1 1 260px' }}>
        <Card.Content>
          <Statistic
            title="Refund Rate"
            description="Last 30 days"
            value={null}
            empty="No data yet"
            status={{ type: 'info', text: 'Awaiting first billing cycle' }}
            footer="Use concise empty states that do not overpower normal values."
          />
        </Card.Content>
      </Card>
      <Card style={{ minWidth: 260, flex: '1 1 260px' }}>
        <Card.Content>
          <Statistic
            title="Warehouse Feed"
            description="Most recent ETL job"
            error="Unavailable"
            status={{ type: 'danger', text: 'Connection timeout while reading the warehouse feed' }}
            footer="Keep the main error state short, and move details into supporting copy."
          />
        </Card.Content>
      </Card>
      <Card style={{ minWidth: 260, flex: '1 1 260px' }}>
        <Card.Content>
          <Statistic
            title="Forecast Confidence"
            description="This card shows the normal value state after status fallbacks are resolved."
            value={82}
            suffix="/100"
            status={{ type: 'success', text: 'Model calibrated' }}
            extra="Updated after pipeline clean-up"
            footer="Value renders when loading, error, and empty conditions are absent."
          />
        </Card.Content>
      </Card>
    </Flex>
  );
}
