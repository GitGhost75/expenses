package de.expenses.annotation;

import de.expenses.common.GroupConstants;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;

@Component
public class GroupIdArgumentResolver extends AbstractRequestAttributeArgumentResolver {

    @Override
    protected Class<? extends Annotation> getAnnotationClass() {
        return GroupId.class;
    }

    @Override
    protected String getAttributeName() {
        return GroupConstants.GROUP_ID;
    }
}
