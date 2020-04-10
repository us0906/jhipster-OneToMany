package de.kvb.eps.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.kvb.eps.web.rest.TestUtil;

public class VisitorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Visitor.class);
        Visitor visitor1 = new Visitor();
        visitor1.setId(1L);
        Visitor visitor2 = new Visitor();
        visitor2.setId(visitor1.getId());
        assertThat(visitor1).isEqualTo(visitor2);
        visitor2.setId(2L);
        assertThat(visitor1).isNotEqualTo(visitor2);
        visitor1.setId(null);
        assertThat(visitor1).isNotEqualTo(visitor2);
    }
}
