![Banner image](https://raw.githubusercontent.com/valyu-network/n8n-nodes-valyu/main/n8n-valyu.png)

# n8n-nodes-valyu

This is an n8n community node. It lets you use Valyu in your n8n workflows.

Valyu is the world's first purpose-built search API for AI agents, providing access to web content, structured financial data, academic research, and proprietary datasets through a unified search API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Usage Examples](#usage-examples)  
[Compatibility](#compatibility)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

You can install this community node by name: `n8n-nodes-valyu`

## Operations

### Deepsearch
Search across the web, financial data, academic papers, and proprietary sources with intelligent result ranking and transparent pricing.

**Key Parameters:**
- **Query**: Your search query
- **Search Type**: Choose from `all`, `web`, or `proprietary` sources
- **Max Results**: Limit results (1-50)
- **Max Price (CPM)**: Control cost per thousand retrievals
- **Relevance Threshold**: Filter result quality (0-1)
- **Response Length**: Choose from `short`, `medium`, `large`, or `max`
- **Included/Excluded Sources**: Specify data sources
- **Date Range**: Filter by publication date

## Credentials

To authenticate with Valyu, you need to configure:

1. **API URL**: `https://api.valyu.network` (default)
2. **API Key**: Get your API key from the [Valyu Platform](https://platform.valyu.network/) + $10 in free credits!

## Usage Examples

### 📈 Financial Research

**Stock Analysis:**
```
Query: "Apple MD&A 10-k 2008"
```

**Market Intelligence:**
```
Query: "cryptocurrency regulatory developments 2024 impact on Bitcoin price"
```

**Risk Assessment:**
```
Query: "insider trading patterns technology stocks regulatory compliance"
```

### 🎓 Academic Research

**Computer Science:**
```
Query: "large language models reasoning capabilities benchmarks 2024"
```

**Medical Research:**
```
Query: "CRISPR gene editing clinical trials cancer treatment outcomes"
```

**Environmental Science:**
```
Query: "climate change impact renewable energy adoption policies"
```

### 📰 News & Current Events

**Technology News:**
```
Query: "artificial intelligence regulation European Union AI Act implementation"
```

**Market News:**
```
Query: "Federal Reserve interest rate decision market reaction analysis"
```

### 💼 Business Intelligence

**Industry Analysis:**
```
Query: "SaaS market trends subscription model pricing strategies 2024"
```

**Competitive Research:**
```
Query: "cloud computing providers market share AWS Microsoft Google"
```

### 🔬 Research & Development

**Patent Research:**
```
Query: "quantum computing quantum error correction patent applications"
```

**Scientific Literature:**
```
Query: "machine learning drug discovery pharmaceutical research breakthroughs"
```

## Advanced Usage Tips

### Optimizing Search Results

1. **Use Specific Keywords**: Include technical terms, company names, or specific methodologies
2. **Set Relevance Thresholds**: Use higher thresholds (0.7-0.9) for focused research
3. **Control Costs**: Set appropriate max_price limits for your use case
4. **Date Filtering**: Use start_date/end_date for recent developments
5. **Source Selection**: Specify included_sources for targeted searches

### Search Type Guidelines

- **`all`**: Best for comprehensive research across all available sources
- **`web`**: Use for current events, news, and real-time information
- **`proprietary`**: Focus on academic papers, research, and exclusive content

### Response Length Options

- **`short`**: Quick summaries and key points
- **`medium`**: Balanced detail for most use cases
- **`large`**: Comprehensive analysis and context
- **`max`**: Full detailed responses with extensive context

## Compatibility

- **Minimum n8n version**: 0.198.0
- **Tested with**: n8n 1.x
- **Node.js**: >= 18.0.0

## Resources

* [Valyu API Documentation](https://docs.valyu.network/)
* [Valyu Platform](https://platform.valyu.network/)
* [Financial Search Guide](https://docs.valyu.network/finance)
* [Academic Search Guide](https://docs.valyu.network/academic)
* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Version History

### 0.1.0
- Initial release
- Deepsearch operation support
- Financial data, academic research, and web search capabilities
- Configurable API URL and authentication