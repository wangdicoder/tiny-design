import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Input,
  Menu,
  Segmented,
  Select,
  Split,
  Switch,
  Tag,
  Text,
  Textarea,
} from '@tiny-design/react';
import {
  IconArchive,
  IconDeleteArchive,
  IconDocument,
  IconMore,
  IconSearch,
  IconShop,
  IconTags,
  IconTeam,
  IconTrash,
} from '@tiny-design/icons';

type MailFolderKey =
  | 'inbox'
  | 'drafts'
  | 'sent'
  | 'junk'
  | 'trash'
  | 'archive'
  | 'social'
  | 'updates'
  | 'forums'
  | 'shopping'
  | 'promotions';

type MailFilter = 'all' | 'unread';

type MailThread = {
  id: string;
  folder: MailFolderKey;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  body: string[];
  replyTo: string;
  time: string;
  unread?: boolean;
  tags: string[];
};

type MailThreadSeed = Omit<MailThread, 'initials' | 'replyTo' | 'body'> & {
  body?: string[];
  replyTo?: string;
};

const mailPrimaryFolders = [
  { key: 'inbox', label: 'Inbox', count: '128', icon: <IconArchive /> },
  { key: 'drafts', label: 'Drafts', count: '9', icon: <IconDocument /> },
  { key: 'sent', label: 'Sent', icon: <IconDocument /> },
  { key: 'junk', label: 'Junk', count: '23', icon: <IconDeleteArchive /> },
  { key: 'trash', label: 'Trash', icon: <IconTrash /> },
  { key: 'archive', label: 'Archive', icon: <IconArchive /> },
] as const;

const mailSecondaryFolders = [
  { key: 'social', label: 'Social', count: '972', icon: <IconTeam /> },
  { key: 'updates', label: 'Updates', count: '342', icon: <IconDocument /> },
  { key: 'forums', label: 'Forums', count: '128', icon: <IconTags /> },
  { key: 'shopping', label: 'Shopping', count: '8', icon: <IconShop /> },
  { key: 'promotions', label: 'Promotions', count: '21', icon: <IconTags /> },
] as const;

function getMailInitials(sender: string): string {
  return sender
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getMailReplyTo(sender: string): string {
  return `${sender.toLowerCase().replace(/\s+/g, '')}@example.com`;
}

const mailThreadSeeds: MailThreadSeed[] = [
  {
    id: 'william-smith',
    folder: 'inbox',
    sender: 'William Smith',
    initials: 'WS',
    subject: 'Meeting Tomorrow',
    preview:
      "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the details and have some ideas I'd like to share.",
    body: [
      "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.",
      'Please come prepared with any questions or insights you may have. Looking forward to our meeting!',
      'Best regards, William',
    ],
    replyTo: 'williamsmith@example.com',
    time: 'Oct 22, 2023, 9:00 AM',
    tags: ['meeting', 'work', 'important'],
  },
  {
    id: 'alice-smith',
    folder: 'inbox',
    sender: 'Alice Smith',
    subject: 'Re: Project Update',
    preview:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.",
    time: 'over 2 years ago',
    tags: ['work', 'important'],
  },
  {
    id: 'bob-johnson',
    folder: 'inbox',
    sender: 'Bob Johnson',
    subject: 'Weekend Plans',
    preview:
      "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details.",
    time: 'about 3 years ago',
    tags: ['personal'],
  },
  {
    id: 'emily-davis',
    folder: 'inbox',
    sender: 'Emily Davis',
    subject: 'Re: Question about Budget',
    preview:
      "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources. I've reviewed the budget report and identified a few areas where we might be able to optimize our spending.",
    time: 'about 3 years ago',
    unread: true,
    tags: ['work', 'budget'],
  },
  {
    id: 'michael-wilson',
    folder: 'inbox',
    sender: 'Michael Wilson',
    subject: 'Important Announcement',
    preview:
      "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments.",
    time: 'about 3 years ago',
    unread: true,
    tags: ['meeting', 'work', 'important'],
  },
  {
    id: 'sarah-brown',
    folder: 'inbox',
    sender: 'Sarah Brown',
    subject: 'Re: Feedback on Proposal',
    preview:
      "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.",
    time: 'about 3 years ago',
    tags: ['work'],
  },
  {
    id: 'david-lee',
    folder: 'inbox',
    sender: 'David Lee',
    subject: 'New Project Idea',
    preview:
      "I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months. I've prepared a detailed proposal outlining the potential benefits and the strategy for execution.",
    time: 'about 3 years ago',
    unread: true,
    tags: ['meeting', 'work', 'important'],
  },
  {
    id: 'olivia-wilson',
    folder: 'inbox',
    sender: 'Olivia Wilson',
    subject: 'Vacation Plans',
    preview:
      "Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options. I believe it's time for us to unwind and recharge.",
    time: 'over 3 years ago',
    tags: ['personal'],
  },
  {
    id: 'james-martin',
    folder: 'inbox',
    sender: 'James Martin',
    subject: 'Re: Conference Registration',
    preview:
      "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.",
    time: 'over 3 years ago',
    tags: ['work', 'conference'],
  },
  {
    id: 'sophia-white',
    folder: 'inbox',
    sender: 'Sophia White',
    subject: 'Team Dinner',
    preview:
      "Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication. I've made reservations at a lovely restaurant.",
    time: 'over 3 years ago',
    tags: ['meeting', 'work'],
  },
  {
    id: 'daniel-johnson',
    folder: 'inbox',
    sender: 'Daniel Johnson',
    subject: 'Feedback Request',
    preview:
      "I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track. I've attached the deliverables for your review.",
    time: 'over 3 years ago',
    tags: ['work'],
  },
  {
    id: 'ava-taylor',
    folder: 'inbox',
    sender: 'Ava Taylor',
    subject: 'Re: Meeting Agenda',
    preview:
      "Here's the agenda for our meeting next week. I've included all the topics we need to cover, as well as time allocations for each. If you have any additional items to discuss, please let me know.",
    time: 'over 3 years ago',
    unread: true,
    tags: ['meeting', 'work'],
  },
  {
    id: 'william-anderson',
    folder: 'inbox',
    sender: 'William Anderson',
    subject: 'Product Launch Update',
    preview:
      "The product launch is on track. I'll provide an update during our call. We've made substantial progress in the development and marketing of our new product, and I'm excited to share the latest updates with you.",
    time: 'over 3 years ago',
    tags: ['meeting', 'work', 'important'],
  },
  {
    id: 'mia-harris',
    folder: 'inbox',
    sender: 'Mia Harris',
    subject: 'Re: Travel Itinerary',
    preview:
      "I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order.",
    time: 'over 3 years ago',
    tags: ['personal', 'travel'],
  },
  {
    id: 'ethan-clark',
    folder: 'inbox',
    sender: 'Ethan Clark',
    subject: 'Team Building Event',
    preview:
      "Let's plan a team-building event for our department. Team cohesion and morale are vital to our success, and I believe a well-organized team-building event can be incredibly beneficial. I've done some research and have a few ideas.",
    time: 'over 3 years ago',
    unread: true,
    tags: ['meeting', 'work'],
  },
  {
    id: 'chloe-hall',
    folder: 'inbox',
    sender: 'Chloe Hall',
    subject: 'Re: Budget Approval',
    preview:
      "The budget has been approved. We can proceed with the project. I'm delighted to inform you that our budget proposal has received the green light from the finance department. This is a significant milestone.",
    time: 'over 3 years ago',
    tags: ['work', 'budget'],
  },
  {
    id: 'samuel-turner',
    folder: 'inbox',
    sender: 'Samuel Turner',
    subject: 'Weekend Hike',
    preview:
      "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails.",
    time: 'over 3 years ago',
    tags: ['personal'],
  },
];

const mailThreads: MailThread[] = mailThreadSeeds.map((thread) => ({
  ...thread,
  initials: getMailInitials(thread.sender),
  replyTo: thread.replyTo ?? getMailReplyTo(thread.sender),
  body: thread.body ?? [thread.preview],
}));

const folderLabels: Record<MailFolderKey, string> = {
  inbox: 'Inbox',
  drafts: 'Drafts',
  sent: 'Sent',
  junk: 'Junk',
  trash: 'Trash',
  archive: 'Archive',
  social: 'Social',
  updates: 'Updates',
  forums: 'Forums',
  shopping: 'Shopping',
  promotions: 'Promotions',
};

function getMailTagClassName(tag: string): string {
  return `theme-studio__mail-thread-tag_${tag.toLowerCase().replace(/\s+/g, '-')}`;
}

export function MailPreview(): React.ReactElement {
  const [activeFolder, setActiveFolder] = useState<MailFolderKey>('inbox');
  const [activeFilter, setActiveFilter] = useState<MailFilter>('all');
  const [selectedThreadId, setSelectedThreadId] = useState<string>('william-smith');
  const [search, setSearch] = useState('');
  const [muteThread, setMuteThread] = useState(false);

  const visibleThreads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mailThreads.filter((thread) => {
      const matchesFolder = thread.folder === activeFolder;
      const matchesFilter = activeFilter === 'all' || thread.unread;
      const matchesQuery =
        query.length === 0 ||
        [thread.sender, thread.subject, thread.preview, thread.tags.join(' ')].some((field) =>
          field.toLowerCase().includes(query),
        );

      return matchesFolder && matchesFilter && matchesQuery;
    });
  }, [activeFilter, activeFolder, search]);

  useEffect(() => {
    if (!visibleThreads.some((thread) => thread.id === selectedThreadId)) {
      setSelectedThreadId(visibleThreads[0]?.id ?? mailThreads[0].id);
    }
  }, [selectedThreadId, visibleThreads]);

  const selectedThread =
    visibleThreads.find((thread) => thread.id === selectedThreadId) ?? visibleThreads[0] ?? mailThreads[0];

  return (
    <Grid className="theme-studio__mail-shell">
      <Card className="theme-studio__mail-sidebar">
        <Card.Content>
          <div className="theme-studio__mail-account-wrap">
            <Select defaultValue="gmail-alicia-koch" size="sm" className="theme-studio__mail-account">
              <Select.Option value="gmail-alicia-koch">Gmail Alicia Koch</Select.Option>
              <Select.Option value="workspace-alicia-koch">Workspace Alicia Koch</Select.Option>
            </Select>
          </div>

          <div className="theme-studio__mail-nav-group">
            <Menu
              mode="inline"
              variant="fill"
              appearance="navigation"
              selectionStyle="background"
              size="sm"
              inlineIndent={12}
              className="theme-studio__mail-menu"
              selectedKeys={[activeFolder]}
              onSelect={(selectedKey) => setActiveFolder(selectedKey as MailFolderKey)}>
              {mailPrimaryFolders.map((folder) => (
                <Menu.Item
                  key={folder.key}
                  index={folder.key}
                  icon={folder.icon}
                  extra={folder.count ? <span className="theme-studio__mail-nav-count">{folder.count}</span> : null}>
                  {folder.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>

          <div className="theme-studio__mail-nav-group theme-studio__mail-nav-group_secondary">
            <Menu
              mode="inline"
              variant="fill"
              appearance="navigation"
              selectionStyle="background"
              size="sm"
              inlineIndent={12}
              className="theme-studio__mail-menu"
              selectedKeys={[activeFolder]}
              onSelect={(selectedKey) => setActiveFolder(selectedKey as MailFolderKey)}>
              {mailSecondaryFolders.map((folder) => (
                <Menu.Item
                  key={folder.key}
                  index={folder.key}
                  icon={folder.icon}
                  extra={<span className="theme-studio__mail-nav-count">{folder.count}</span>}>
                  {folder.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Card.Content>
      </Card>

      <Split min={320} max={360} defaultSize="42%" className="theme-studio__mail-split">
        <Card className="theme-studio__mail-panel">
        <Card.Content>
          <Flex justify="space-between" className="theme-studio__mail-panel-head">
            <Heading level={3}>{folderLabels[activeFolder]}</Heading>
            <Segmented
              size="md"
              value={activeFilter}
              options={[
                { label: 'All mail', value: 'all' },
                { label: 'Unread', value: 'unread' },
              ]}
              onChange={(value) => setActiveFilter(String(value) as MailFilter)}
            />
          </Flex>

          <div className="theme-studio__mail-search-wrap">
            <Input
              value={search}
              placeholder="Search"
              prefix={<IconSearch size={14} />}
              className="theme-studio__mail-search"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <Flex vertical className="theme-studio__mail-thread-list">
            {visibleThreads.map((thread) => (
              <Card
                key={thread.id}
                hoverable
                active={selectedThread.id === thread.id}
                className={`theme-studio__mail-thread${selectedThread.id === thread.id ? ' theme-studio__mail-thread_active' : ''}`}
                onClick={() => setSelectedThreadId(thread.id)}>
                <Card.Content>
                  <div className="theme-studio__mail-thread-head">
                    <Text strong className="theme-studio__mail-thread-sender">{thread.sender}</Text>
                    <span className="theme-studio__mail-thread-time">{thread.time}</span>
                  </div>
                  <div className="theme-studio__mail-thread-subject">
                    <span>{thread.subject}</span>
                    {thread.unread ? <i className="theme-studio__mail-thread-dot" /> : null}
                  </div>
                  <Text className="theme-studio__mail-thread-preview">{thread.preview}</Text>
                  <Flex wrap gap={6} className="theme-studio__mail-thread-tags">
                    {thread.tags.map((tag) => (
                      <Tag
                        key={tag}
                        variant="soft"
                        className={`theme-studio__mail-thread-tag ${getMailTagClassName(tag)}`}>
                        {tag}
                      </Tag>
                    ))}
                  </Flex>
                </Card.Content>
              </Card>
            ))}
          </Flex>
        </Card.Content>
      </Card>

      <Card className="theme-studio__mail-detail">
        <Card.Content>
          <div className="theme-studio__mail-detail-toolbar">
            <Flex className="theme-studio__mail-detail-actions">
              <Button size="sm" variant="ghost" className="theme-studio__mail-icon-btn" aria-label="Archive">
                <IconArchive />
              </Button>
              <Button size="sm" variant="ghost" className="theme-studio__mail-icon-btn" aria-label="Move to junk">
                <IconDeleteArchive />
              </Button>
              <Button size="sm" variant="ghost" className="theme-studio__mail-icon-btn" aria-label="Move to trash">
                <IconTrash />
              </Button>
              <Button size="sm" variant="ghost" className="theme-studio__mail-icon-btn" aria-label="Snooze">
                <IconTags />
              </Button>
            </Flex>
            <Button size="sm" variant="ghost" className="theme-studio__mail-icon-btn" aria-label="More">
              <IconMore />
            </Button>
          </div>

          <div className="theme-studio__mail-message-head">
            <div className="theme-studio__mail-message-meta">
              <Avatar>{selectedThread.initials}</Avatar>
              <div className="theme-studio__mail-message-copy">
                <div className="theme-studio__mail-message-sender">{selectedThread.sender}</div>
                <div className="theme-studio__mail-message-subject">{selectedThread.subject}</div>
                <div className="theme-studio__mail-message-replyto">
                  <span>Reply-To:</span>
                  <span>{selectedThread.replyTo}</span>
                </div>
              </div>
            </div>
            <Text type="secondary" className="theme-studio__mail-message-time">
              {selectedThread.time}
            </Text>
          </div>

          <Flex vertical className="theme-studio__mail-message-body">
            {selectedThread.body.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </Flex>

          <div className="theme-studio__mail-reply">
            <Textarea rows={6} resizable={false} placeholder={`Reply ${selectedThread.sender}...`} />
            <div className="theme-studio__mail-reply-foot">
              <label className="theme-studio__mail-mute">
                <Switch checked={muteThread} onChange={setMuteThread} size="sm" />
                <span>Mute this thread</span>
              </label>
              <Button variant="solid" color="primary">
                Send
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>
      </Split>
    </Grid>
  );
}
